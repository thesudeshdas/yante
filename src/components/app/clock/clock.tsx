import { useState, useEffect } from "react";
import { formatTime } from "@/lib/utils/time";

export default function Clock() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-blue-300 flex items-center justify-center h-full text-2xl">
      <time className="font-mono bg-green-300 leading-none">{time}</time>
    </div>
  );
}
