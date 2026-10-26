"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addDays,
  differenceInCalendarDays,
  format,
  startOfDay,
  subDays,
} from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import ErrorModal from "@/components/ErrorModal";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFE",
  "#FF6699",
];

const DAY_KEY = "yyyy-MM-dd";
const DEFAULT_RANGE_DAYS = 7; // last 7 days, today included
const MIN_DAYS = 2;
const MAX_DAYS = 30;

const EMPTY_DATA = {
  timeZone: "",
  visitsPerDay: [],
  devices: [],
  browsers: [],
  referrers: [],
  countries: [],
  averageSessionDuration: [],
};

// Server-side days arrive as 'YYYY-MM-DD' strings, so they are compared as
// strings. Never go through Date/toISOString here: that converts to UTC and
// shifts days by one for anyone whose time zone isn't UTC.
function sumByLabel(rows, labelKey, startKey, endKey) {
  const totals = new Map();
  for (const row of rows || []) {
    if (typeof row.day !== "string" || row.day < startKey || row.day > endKey) continue;
    const label = row[labelKey] || "Unknown";
    totals.set(label, (totals.get(label) || 0) + (Number(row.count) || 0));
  }
  return [...totals]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 10);
}

function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

export default function AnalyticsPage() {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorTrigger, setErrorTrigger] = useState(0);
  const [endDate, setEndDate] = useState(() => startOfDay(new Date()));
  const [startDate, setStartDate] = useState(() =>
    subDays(startOfDay(new Date()), DEFAULT_RANGE_DAYS - 1),
  );
  const [data, setData] = useState(EMPTY_DATA);

  function showError(text) {
    setMessage(text);
    setErrorOpen(true);
    setErrorTrigger((prev) => prev + 1);
  }

  // The passcode is checked by the server: the data is only returned when the
  // key is right, so nothing sensitive ships in the page's JavaScript.
  async function login() {
    if (checking) return;
    if (!password) {
      showError("Enter the passcode");
      return;
    }

    setChecking(true);
    try {
      const res = await axios.get("/api/analytics", {
        headers: { "x-analytics-key": encodeURIComponent(password) },
        validateStatus: () => true,
      });

      if (res.status === 200) {
        setData({ ...EMPTY_DATA, ...res.data });
        setStep(2);
        return;
      }
      if (res.status === 401) showError("Invalid passcode");
      else if (res.status === 429)
        showError("Too many attempts. Try again later.");
      else if (res.status === 503)
        showError(res.data?.error || "Analytics is not configured.");
      else showError("Couldn't load analytics. Please try again.");
    } catch {
      showError("Couldn't reach the server. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  const startKey = format(startDate, DAY_KEY);
  const endKey = format(endDate, DAY_KEY);

  // One entry per day in the range, with 0 for days that have no data.
  const days = [];
  for (
    let d = startDate;
    differenceInCalendarDays(endDate, d) >= 0;
    d = addDays(d, 1)
  ) {
    days.push(d);
  }

  const visitsByDay = new Map(
    (data.visitsPerDay || []).map((r) => [r.day, Number(r.visits) || 0]),
  );
  const visitsData = days.map((d) => ({
    day: format(d, "EEE, MMM d"),
    visits: visitsByDay.get(format(d, DAY_KEY)) || 0,
  }));
  const hasVisits = visitsData.some((v) => v.visits > 0);

  const secondsByDay = new Map(
    (data.averageSessionDuration || []).map((r) => [r.day, Number(r.seconds) || 0]),
  );
  const averageSessionData = days.map((d) => {
    const seconds = secondsByDay.get(format(d, DAY_KEY)) || 0;
    return {
      day: format(d, "EEE, MMM d"),
      minutes: Math.round((seconds / 60) * 100) / 100,
      timeLabel: formatDuration(seconds),
    };
  });
  const hasDurations = averageSessionData.some((v) => v.minutes > 0);

  const referrersData = sumByLabel(data.referrers, "referrer", startKey, endKey);
  const countriesData = sumByLabel(data.countries, "country", startKey, endKey);

  // All-time totals (not limited by the date range).
  const devicesData = (data.devices || []).map((d) => ({
    device: d.device || "Unknown",
    count: Number(d.count) || 0,
  }));
  const browsersData = (data.browsers || []).map((b) => ({
    browser: b.browser || "Unknown",
    count: Number(b.count) || 0,
  }));
  const totalVisits = devicesData.reduce((sum, d) => sum + d.count, 0);

  const renderNoRecord = (empty) =>
    empty ? (
      <p className="text-gray-400">
        No analytics available for the selected period.
      </p>
    ) : null;

  if (checking) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-black border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-white font-semibold">
            Loading<span className="loading-dots"></span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white ">
      {step === 1 && (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-black text-green-400 font-mono space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">ACCESS TERMINAL</h2>
          <p className="text-sm text-green-300">
            Enter passcode to continue...
          </p>
          <div className="relative w-60">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full bg-black border border-green-400 text-green-300 placeholder-green-600 px-3 py-2 pr-16 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={login}
              className="absolute top-0 right-0 h-full bg-green-500 text-black px-3 rounded-r hover:bg-green-600 transition font-bold"
            >
              Enter
            </button>
          </div>
          <ErrorModal
            isOpen={errorOpen}
            message={message}
            triggerId={errorTrigger}
            onClose={() => setErrorOpen(false)}
            autoClose
          />{" "}
        </div>
      )}{" "}
      {step === 2 && (
        <div className="px-4 sm:px-6 lg:px-12 py-6 space-y-8 pb-20">
          {/* Date Pickers */}
          <h1 className="text-2xl pt-10 sm:text-3xl font-extrabold">
            Website Analytics
          </h1>
          {data.timeZone && (
            <p className="text-xs text-gray-500 -mt-6">
              Days are shown in {data.timeZone} time.
            </p>
          )}
          <div className="sm:flex gap-4 text-sm items-center">
            <div className="sm:mb-0 mb-2">
              <label className=" mb-1 text-white">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (!date) return;
                  const picked = startOfDay(date);
                  const span = differenceInCalendarDays(endDate, picked) + 1;
                  if (span < MIN_DAYS || span > MAX_DAYS) return;
                  setStartDate(picked);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy-MM-dd"
                maxDate={endDate}
                className="rounded p-1 px-2 ml-1 w-25 border border-blue-600/50"
              />
            </div>

            <div>
              <label className=" mb-1 text-white">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  if (!date) return;
                  const picked = startOfDay(date);
                  const span = differenceInCalendarDays(picked, startDate) + 1;
                  if (
                    span < MIN_DAYS ||
                    span > MAX_DAYS ||
                    picked > startOfDay(new Date())
                  )
                    return;
                  setEndDate(picked);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="rounded p-1 px-2 ml-1 w-25 border border-blue-600/50"
              />
            </div>
          </div>

          {/* Visits Over Time */}
          <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
            <h2 className="text-lg sm:text-xl mb-4">Visits Over Time</h2>
            {renderNoRecord(!hasVisits) || (
              <div className="w-full h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitsData}>
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="#0088FE"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Referrers & Countries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
              <h2 className="text-lg sm:text-xl mb-4">Top Referrers</h2>
              {renderNoRecord(referrersData.length === 0) || (
                <ul className="space-y-2 text-sm sm:text-base">
                  {referrersData.map((ref) => (
                    <li
                      key={ref.label}
                      className="flex justify-between border-b border-gray-700 pb-1"
                    >
                      <span>{ref.label}</span>
                      <span className="text-gray-400">{ref.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
              <h2 className="text-lg sm:text-xl mb-4">Top Countries</h2>
              {renderNoRecord(countriesData.length === 0) || (
                <ul className="space-y-2 text-sm sm:text-base">
                  {countriesData.map((c) => (
                    <li
                      key={c.label}
                      className="flex justify-between border-b border-gray-700 pb-1"
                    >
                      <span>{c.label}</span>
                      <span className="text-gray-400">{c.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Average Session Duration */}
          <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
            <h2 className="text-lg sm:text-xl mb-4">
              Average Session Duration (Per Day)
            </h2>
            {renderNoRecord(!hasDurations) || (
              <div className="w-full h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={averageSessionData}>
                    <XAxis dataKey="day" />
                    <YAxis unit=" min" />
                    <Tooltip
                      formatter={(_, name, props) => props.payload.timeLabel}
                    />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      stroke="#FF8042"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
          <p className="text-xl sm:text-2xl font-extrabold pt-10">
            All-Time Totals (Not Limited by Date Range)
          </p>
          <p className="text-base sm:text-lg font-bold -mt-5">
            Total Visits ({totalVisits})
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
              <h2 className="text-lg sm:text-xl mb-4">Device Breakdown </h2>
              {renderNoRecord(devicesData.length === 0) || (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={devicesData}
                      dataKey="count"
                      nameKey="device"
                      outerRadius={100}
                      label
                    >
                      {devicesData.map((entry, index) => (
                        <Cell
                          key={`device-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
              <h2 className="text-lg sm:text-xl mb-4">Browser Breakdown</h2>
              {renderNoRecord(browsersData.length === 0) || (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={browsersData}
                      dataKey="count"
                      nameKey="browser"
                      outerRadius={100}
                      label
                    >
                      {browsersData.map((entry, index) => (
                        <Cell
                          key={`browser-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
