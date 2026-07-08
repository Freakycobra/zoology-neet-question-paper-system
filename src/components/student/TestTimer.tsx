"use client";

import { useEffect, useState, useCallback } from "react";
import { Clock } from "lucide-react";

interface TestTimerProps {
  duration: number;
  onTimeUp: () => void;
  warningAt?: number;
}

export default function TestTimer({
  duration,
  onTimeUp,
  warningAt = 5,
}: TestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [warningShown, setWarningShown] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("test-timer");
    if (saved) {
      const remaining = parseInt(saved, 10);
      if (!isNaN(remaining) && remaining > 0) {
        setTimeRemaining(remaining);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        const next = prev - 1;
        localStorage.setItem("test-timer", String(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  useEffect(() => {
    if (timeRemaining <= warningAt * 60 && timeRemaining > 0 && !warningShown) {
      setWarningShown(true);
    }
  }, [timeRemaining, warningAt, warningShown]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isWarning = timeRemaining <= warningAt * 60;
  const isCritical = timeRemaining <= 2 * 60;

  const getTimerClasses = () => {
    if (isCritical) {
      return "text-red-600 animate-pulse-critical font-bold";
    }
    if (isWarning) {
      return "text-amber-600 animate-pulse-warning font-semibold";
    }
    return "text-slate-700 font-medium";
  };

  const getIconColor = () => {
    if (isCritical) return "text-red-500";
    if (isWarning) return "text-amber-500";
    return "text-teal-600";
  };

  const getBgClasses = () => {
    if (isCritical) return "bg-red-50 border-red-200";
    if (isWarning) return "bg-amber-50 border-amber-200";
    return "bg-slate-50 border-slate-200";
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${getBgClasses()} ${getTimerClasses()} transition-colors duration-300`}
      role="timer"
      aria-label={`Time remaining: ${formatted}`}
    >
      <Clock className={`w-5 h-5 ${getIconColor()}`} />
      <span className="text-xl tabular-nums tracking-wide">{formatted}</span>
      {isWarning && (
        <span className="text-xs ml-1 hidden sm:inline">
          {isCritical ? "Hurry up!" : "Almost done!"}
        </span>
      )}
    </div>
  );
}
