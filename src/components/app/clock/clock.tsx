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

  return <time className="font-mono text-7xl">{time}</time>;
}
