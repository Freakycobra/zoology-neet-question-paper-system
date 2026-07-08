"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface DifficultySliderProps {
  easy: number;
  medium: number;
  hard: number;
  onChange: (split: { easy: number; medium: number; hard: number }) => void;
}

export function DifficultySlider({ easy, medium, hard, onChange }: DifficultySliderProps) {
  const total = easy + medium + hard;

  // Normalize to 100%
  const normalize = useCallback(
    (newEasy: number, newMedium: number, newHard: number) => {
      const sum = newEasy + newMedium + newHard;
      if (sum === 0) return { easy: 33, medium: 34, hard: 33 };
      return {
        easy: Math.round((newEasy / sum) * 100),
        medium: Math.round((newMedium / sum) * 100),
        hard: 100 - Math.round((newEasy / sum) * 100) - Math.round((newMedium / sum) * 100),
      };
    },
    []
  );

  const handleEasyChange = (val: number) => {
    const remaining = 100 - val;
    const mediumShare = total > 0 ? medium / (medium + hard) : 0.5;
    const newMedium = Math.round(remaining * mediumShare);
    const newHard = remaining - newMedium;
    onChange(normalize(val, newMedium, newHard));
  };

  const handleMediumChange = (val: number) => {
    const remaining = 100 - val;
    const easyShare = total > 0 ? easy / (easy + hard) : 0.5;
    const newEasy = Math.round(remaining * easyShare);
    const newHard = remaining - newEasy;
    onChange(normalize(newEasy, val, newHard));
  };

  const handleHardChange = (val: number) => {
    const remaining = 100 - val;
    const easyShare = total > 0 ? easy / (easy + medium) : 0.5;
    const newEasy = Math.round(remaining * easyShare);
    const newMedium = remaining - newEasy;
    onChange(normalize(newEasy, newMedium, val));
  };

  const easyWidth = total > 0 ? (easy / total) * 100 : 33;
  const mediumWidth = total > 0 ? (medium / total) * 100 : 34;
  const hardWidth = total > 0 ? (hard / total) * 100 : 33;

  return (
    <div className="space-y-4">
      {/* Visual Bar */}
      <div className="flex h-8 rounded-lg overflow-hidden border border-slate-200">
        <div
          className="bg-emerald-400 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
          style={{ width: `${easyWidth}%` }}
        >
          {easyWidth > 12 && `${Math.round(easyWidth)}%`}
        </div>
        <div
          className="bg-amber-400 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
          style={{ width: `${mediumWidth}%` }}
        >
          {mediumWidth > 12 && `${Math.round(mediumWidth)}%`}
        </div>
        <div
          className="bg-red-400 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
          style={{ width: `${hardWidth}%` }}
        >
          {hardWidth > 12 && `${Math.round(hardWidth)}%`}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-emerald-400" />
          <span className="text-slate-600">Easy</span>
          <span className="font-bold text-slate-800">{easy}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-amber-400" />
          <span className="text-slate-600">Medium</span>
          <span className="font-bold text-slate-800">{medium}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-red-400" />
          <span className="text-slate-600">Hard</span>
          <span className="font-bold text-slate-800">{hard}%</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-3 pt-2">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <label className="font-medium text-slate-700">Easy</label>
            <span className="text-xs text-slate-500">{easy}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={easy}
            onChange={(e) => handleEasyChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-emerald-100 accent-emerald-500"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <label className="font-medium text-slate-700">Medium</label>
            <span className="text-xs text-slate-500">{medium}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={medium}
            onChange={(e) => handleMediumChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-amber-100 accent-amber-500"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <label className="font-medium text-slate-700">Hard</label>
            <span className="text-xs text-slate-500">{hard}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={hard}
            onChange={(e) => handleHardChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-red-100 accent-red-500"
          />
        </div>
      </div>

      {/* Validation */}
      {easy + medium + hard !== 100 && (
        <p className="text-xs text-red-500">
          Total must equal 100%. Current: {easy + medium + hard}%
        </p>
      )}
    </div>
  );
}
