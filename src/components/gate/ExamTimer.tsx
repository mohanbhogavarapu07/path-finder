import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface ExamTimerProps {
  timeRemaining: number;
  onTimeUpdate: (time: number) => void;
  onTimeEnd: () => void;
}

export const ExamTimer = ({ timeRemaining, onTimeUpdate, onTimeEnd }: ExamTimerProps) => {
  const [time, setTime] = useState(timeRemaining);

  useEffect(() => {
    setTime(timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeEnd();
          return 0;
        }
        const newTime = prev - 1;
        onTimeUpdate(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUpdate, onTimeEnd]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const isWarning = time <= 600; // Last 10 minutes
  const isCritical = time <= 300; // Last 5 minutes

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-semibold transition-colors ${
        isCritical
          ? "bg-red-500 text-white animate-pulse"
          : isWarning
          ? "bg-yellow-500 text-white"
          : "bg-blue-50 text-blue-700 border border-blue-200"
      }`}
    >
      <Clock className="w-5 h-5" />
      <span>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};
