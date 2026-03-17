"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFE",
  "#FF6699",
];

export default function AnalyticsPage() {
  const today = new Date();
  const [startDate, setStartDate] = useState(
    new Date(today.setDate(today.getDate() - 6)),
  ); // 7-day default
  const [endDate, setEndDate] = useState(new Date());

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    visitsPerDay: [],
    devices: [],
    browsers: [],
    referrers: [],
    countries: [],
    averageSessionDuration: [],
  });

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await axios.get("/api/analytics");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  // --- Filter helpers ---
  const filterByDate = (arr, key) => {
    return arr
      ?.filter((item) => {
        if (!item[key]) return false; // skip missing or null values
        const d = new Date(item[key]);
        if (isNaN(d.getTime())) return false; // skip invalid dates
        const dateOnly = d.toISOString().split("T")[0];
        const start = startDate.toISOString().split("T")[0];
        const end = endDate.toISOString().split("T")[0];
        return dateOnly >= start && dateOnly <= end;
      })
      .sort((a, b) => new Date(a[key]).getTime() - new Date(b[key]).getTime());
  };

  // --- Process analytics ---
  const visitsData = filterByDate(data.visitsPerDay, "day").map((d) => {
    const date = new Date(d.day);
    return {
      ...d,
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    };
  });

  
  // Devices
  const devicesData = data.devices?.length
    ? data.devices.map((d) => ({
        device: d.device || "Unknown",
        count: Number(d.count) || 0,
      }))
    : [];
  const browsersData = data.browsers?.length
    ? data.browsers.map((b) => ({
        browser: b.browser || "Unknown",
        count: Number(b.count) || 0,
      }))
    : [];

  const referrersData = filterByDate(data.referrers, "day");
  const countriesData = filterByDate(data.countries, "day");

  const averageSessionData = filterByDate(
    data.averageSessionDuration,
    "day",
  ).map((d) => {
    const totalSeconds = d.seconds;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const date = new Date(d.day);
    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      duration: parseFloat((hours + minutes / 60).toFixed(2)),
      timeLabel: `${hours}hrs ${minutes}mins`,
    };
  });

  if (loading) {
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

  const renderNoRecord = (arr) =>
    !arr || arr.length === 0 ? (
      <p className="text-gray-400">
        No analytics available for the selected period.
      </p>
    ) : null;

  return (
    <div className="min-h-screen pb-20 bg-black text-white px-4 sm:px-6 lg:px-12 py-6 space-y-8">
      <h1 className="text-2xl pt-10 sm:text-3xl font-bold">
        Website Analytics
      </h1>

      {/* Date Pickers */}
      <div className="sm:flex gap-4 items-center">
        <div>
          <label className=" mb-1 text-white">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              if (!date) return;
              const diff =
                (endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) +
                1;
              if (diff < 2 || diff > 30) return; // enforce min 2, max 30 days
              setStartDate(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            maxDate={endDate}
            className="rounded p-2 "
          />
        </div>

        <div>
          <label className=" mb-1 text-white">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              if (!date) return;
              const diff =
                (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) +
                1;
              if (diff < 2 || diff > 30 || date > new Date()) return;
              setEndDate(date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            className="rounded p-2"
          />
        </div>
      </div>

      {/* Visits Over Time */}
      <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-lg sm:text-xl mb-4">Visits Over Time</h2>
        {renderNoRecord(visitsData) || (
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitsData}>
                <XAxis dataKey="day" />
                <YAxis />
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

      {/* Device & Browser PieCharts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl mb-4">Device Breakdown</h2>
          {renderNoRecord(devicesData) || (
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
          {renderNoRecord(browsersData) || (
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

      {/* Referrers & Countries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl mb-4">Top Referrers</h2>
          {renderNoRecord(referrersData) || (
            <ul className="space-y-2 text-sm sm:text-base">
              {referrersData
                .sort((a, b) => b.count - a.count)
                .slice(0, 10)
                .map((ref, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between border-b border-gray-700 pb-1"
                  >
                    <span>{ref.referrer || "Unknown"}</span>
                    <span className="text-gray-400">{ref.count || 0}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-950 p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl mb-4">Top Countries</h2>
          {renderNoRecord(countriesData) || (
            <ul className="space-y-2 text-sm sm:text-base">
              {countriesData
                .sort((a, b) => b.count - a.count)
                .slice(0, 10)
                .map((c, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between border-b border-gray-700 pb-1"
                  >
                    <span>{c.country || "Unknown"}</span>
                    <span className="text-gray-400">{c.count || 0}</span>
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
        {renderNoRecord(averageSessionData) || (
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={averageSessionData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(_, name, props) => props.payload.timeLabel}
                />
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#FF8042"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
