import { useState, useEffect, useRef } from "react";

interface IPomodoroProps {
  cycleMinutes?: number;
}

export default function Pomodoro({ cycleMinutes = 5 }: IPomodoroProps) {
  const [timeLeft, setTimeLeft] = useState(cycleMinutes * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = cycleMinutes * 60;
  const progress =
    timeLeft === 0 ? 0 : ((totalTime - timeLeft) / totalTime) * 100;

  const circumference = 2 * Math.PI * 290; // radius = 290 (600px - 20px border)
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(totalTime);
    }
    setIsRunning(true);
  };

  const restartTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  return (
    <section className="relative flex flex-col items-center justify-center aspect-square w-[600px] h-[600px]">
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 600 600"
      >
        {/* Background circle */}
        <circle
          cx="300"
          cy="300"
          r="290"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          className="text-foreground/10"
        />

        {/* Progress circle - shows time elapsed */}
        <circle
          cx="300"
          cy="300"
          r="290"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          strokeLinecap="round"
          className="text-white transition-all duration-1000 ease-out"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Countdown display */}
      <div className="flex flex-col items-center justify-center z-10">
        <div className="text-6xl font-mono font-bold text-white mb-8">
          {formatTime(timeLeft)}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Start
          </button>
          <button
            onClick={restartTimer}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Restart
          </button>
        </div>
      </div>
    </section>
  );
}
