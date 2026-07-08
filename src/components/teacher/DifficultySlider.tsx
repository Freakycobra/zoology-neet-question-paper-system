'use client'

interface DifficultySliderProps {
  easy: number
  medium: number
  hard: number
  onChange: (values: { easy: number; medium: number; hard: number }) => void
}

export default function DifficultySlider({ easy, medium, hard, onChange }: DifficultySliderProps) {
  const handleEasyChange = (val: number) => {
    const remaining = 100 - val
    const mediumRatio = medium / (medium + hard || 1)
    const newMedium = Math.round(remaining * mediumRatio)
    const newHard = remaining - newMedium
    onChange({ easy: val, medium: newMedium, hard: newHard })
  }

  const handleMediumChange = (val: number) => {
    const remaining = 100 - val
    const easyRatio = easy / (easy + hard || 1)
    const newEasy = Math.round(remaining * easyRatio)
    const newHard = remaining - newEasy
    onChange({ easy: newEasy, medium: val, hard: newHard })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 h-8 rounded-lg overflow-hidden">
        <div className="h-full bg-emerald-400 flex items-center justify-center text-xs font-semibold text-white transition-all" style={{ width: `${easy}%` }}>
          {easy > 10 && `${easy}%`}
        </div>
        <div className="h-full bg-amber-400 flex items-center justify-center text-xs font-semibold text-white transition-all" style={{ width: `${medium}%` }}>
          {medium > 10 && `${medium}%`}
        </div>
        <div className="h-full bg-rose-400 flex items-center justify-center text-xs font-semibold text-white transition-all" style={{ width: `${hard}%` }}>
          {hard > 10 && `${hard}%`}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-emerald-700 mb-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400" /> Easy
          </label>
          <input
            type="range" min={0} max={100} value={easy}
            onChange={e => handleEasyChange(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-emerald-100 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-xs text-emerald-600 mt-1 font-medium">{easy}%</div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-amber-700 mb-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400" /> Medium
          </label>
          <input
            type="range" min={0} max={100} value={medium}
            onChange={e => handleMediumChange(Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-amber-100 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-xs text-amber-600 mt-1 font-medium">{medium}%</div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-rose-700 mb-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400" /> Hard
          </label>
          <div className="text-xs text-rose-600 mt-1 font-medium">{hard}%</div>
        </div>
      </div>
    </div>
  )
}
