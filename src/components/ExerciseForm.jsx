// src/components/ExerciseForm.jsx
import { useState, useEffect } from "react";

export default function ExerciseForm({
  onAddExercise,
  onUpdateExercise,
  editingExercise,
  cancelEdit,
}) {
  const [form, setForm] = useState({
    date: "",
    exercise: "",
    duration: "",
    calories: "",
  });

  useEffect(() => {
    if (editingExercise) {
      setForm({
        date: editingExercise.date,
        exercise: editingExercise.exercise,
        duration: editingExercise.duration,
        calories: editingExercise.calories,
      });
    } else {
      setForm({ date: "", exercise: "", duration: "", calories: "" });
    }
  }, [editingExercise]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...(editingExercise || { id: crypto.randomUUID() }),
      date: form.date,
      exercise: form.exercise,
      duration: Number(form.duration),
      calories: Number(form.calories),
    };

    if (editingExercise) {
      onUpdateExercise(payload);
    } else {
      onAddExercise(payload);
    }

    setForm({ date: "", exercise: "", duration: "", calories: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mt-6 grid grid-cols-4 gap-4"
    >
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={onChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="exercise"
        placeholder="운동명"
        value={form.exercise}
        onChange={onChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="duration"
        placeholder="시간(분)"
        value={form.duration}
        onChange={onChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="calories"
        placeholder="칼로리(kcal)"
        value={form.calories}
        onChange={onChange}
        required
        className="p-2 border rounded"
      />

      <div className="col-span-4 flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white rounded p-2 font-bold"
        >
          {editingExercise ? "운동 기록 수정" : "운동 기록 추가"}
        </button>
        {editingExercise && (
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 rounded border border-gray-300 text-gray-600"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
