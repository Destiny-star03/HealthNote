// src/components/ExerciseForm.jsx
import { useState } from "react";

const TODAY = new Date().toISOString().slice(0, 10);

export default function ExerciseForm({ onAddExercises }) {
  const [date, setDate] = useState(TODAY);
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedExercise = exercise.trim();
    if (!trimmedExercise) {
      alert("운동명을 입력해주세요.");
      return;
    }

    const numericDuration = Number(duration);
    const numericCalories = Number(calories);

    const newRecord = {
      id: Date.now(),
      date,
      exercise: trimmedExercise,
      duration: Number.isNaN(numericDuration) ? 0 : numericDuration,
      calories: Number.isNaN(numericCalories) ? 0 : numericCalories,
    };

    // App 쪽 시그니처 유지: 배열로 전달
    onAddExercises([newRecord]);

    // 입력값 초기화 (날짜는 그대로 유지)
    setExercise("");
    setDuration("");
    setCalories("");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* 날짜 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
          <span className="text-sky-500 text-sm">📅</span>
          날짜
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="
            w-full rounded-full
            border border-sky-200
            bg-rose-50
            px-4 py-2.5
            text-sm text-slate-700
            focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400
          "
        />
      </div>

      {/* 운동명 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
          <span className="text-sky-500 text-sm">🏋️</span>
          운동명
        </label>
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="예: 벤치프레스, 스쿼트"
          className="
            w-full rounded-full
            border border-sky-200
            bg-rose-50
            px-4 py-2.5
            text-sm text-slate-700
            placeholder:text-slate-300
            focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400
          "
        />
      </div>

      {/* 시간 / 칼로리 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">
            시간 (분)
          </label>
          <input
            type="number"
            min="0"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="
              w-full rounded-full
              border border-sky-200
              bg-rose-50
              px-4 py-2.5
              text-sm text-slate-700
              focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">
            칼로리 (kcal)
          </label>
          <input
            type="number"
            min="0"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="
              w-full rounded-full
              border border-sky-200
              bg-rose-50
              px-4 py-2.5
              text-sm text-slate-700
              focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400
            "
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      <button
        type="submit"
        className="
          w-full mt-1
          inline-flex items-center justify-center gap-2
          rounded-full
          bg-sky-500
          text-white text-sm font-semibold
          py-2.5
          shadow-sm
          hover:bg-sky-600
          transition
        "
      >
        <span className="text-base">💾</span>
        저장
      </button>
    </form>
  );
}
