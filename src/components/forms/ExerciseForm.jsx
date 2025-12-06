// src/components/ExerciseForm.jsx
import { useState, useEffect } from "react";

export default function ExerciseForm({
  onAddExercises,
  editingExercise,      // 현재 수정 중인 운동 기록
  onUpdateExercise,     // 운동 수정 콜백
  cancelEdit,           // 수정 취소 콜백 (선택)
}) {
  const today = new Date().toISOString().slice(0, 10);
  const isEditMode = !!editingExercise;

  const [date, setDate] = useState(today);
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const resetForm = () => {
    setDate(today);
    setExercise("");
    setDuration("");
    setCalories("");
  };

  useEffect(() => {
    if (editingExercise) {
      setDate(editingExercise.date);
      setExercise(editingExercise.exercise ?? "");
      setDuration(
        editingExercise.duration !== undefined && editingExercise.duration !== null
          ? String(editingExercise.duration)
          : ""
      );
      setCalories(
        editingExercise.calories !== undefined && editingExercise.calories !== null
          ? String(editingExercise.calories)
          : ""
      );
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingExercise, today]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedExercise = exercise.trim();
    if (!trimmedExercise) {
      alert("운동명을 입력해주세요.");
      return;
    }

    const record = {
      id: isEditMode ? editingExercise.id : Date.now(),
      date,
      exercise: trimmedExercise,
      duration: Number(duration) || 0,
      calories: Number(calories) || 0,
    };

    if (isEditMode) {
      onUpdateExercise && onUpdateExercise(record);
    } else {
      onAddExercises && onAddExercises([record]);
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    cancelEdit && cancelEdit();
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
          max={today}
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
        <NumberField
          label="시간 (분)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <NumberField
          label="칼로리 (kcal)"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          className="
            flex-1 inline-flex items-center justify-center gap-2
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
          <span>{isEditMode ? "수정" : "저장"}</span>
        </button>

        {isEditMode && (
          <button
            type="button"
            onClick={handleCancel}
            className="
              px-4 py-2.5
              rounded-full
              border border-slate-300
              bg-white
              text-xs font-medium text-slate-600
              hover:bg-slate-50
              transition
            "
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-600">
        {label}
      </label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={onChange}
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
  );
}
