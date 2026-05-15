import Reveal from "./reavel";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const timer = () => {
      const time = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      setCurrentTime(time);
    };
    timer();
    const interval = setInterval(timer, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Reveal>
      <div className="grid text-sm grid-cols-2 items-center py-3 px-6 w-full ">
        <a href="#">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Favour Omirin Image"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />

            <p className="font-bold leading-none">MODRED.DEV</p>
          </div>
        </a>
        <div className="flex justify-end font-serif">{currentTime}</div>
      </div>
    </Reveal>
  );
}
