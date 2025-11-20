// src/components/ExerciseForm.jsx
import { useState } from "react";

function getTodayString() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export default function ExerciseForm({ onAddExercises }) {
  const [date, setDate] = useState(getTodayString());

  const [items, setItems] = useState([
    { id: crypto.randomUUID(), exercise: "", duration: "", calories: "" },
  ]);

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddRow = () => {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), exercise: "", duration: "", calories: "" },
    ]);
  };

  const handleRemoveRow = (id) => {
    setItems((prev) =>
      prev.length === 1 ? prev : prev.filter((item) => item.id !== id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validItems = items.filter(
      (item) =>
        item.exercise.trim() !== "" &&
        item.duration !== "" &&
        item.calories !== ""
    );

    if (validItems.length === 0) {
      alert("최소 1개 이상의 운동을 입력해 주세요.");
      return;
    }

    const newRecords = validItems.map((item) => ({
      id: crypto.randomUUID(),
      date,
      exercise: item.exercise.trim(),
      duration: Number(item.duration),
      calories: Number(item.calories),
    }));

    onAddExercises(newRecords);

    setDate(getTodayString());
    setItems([
      { id: crypto.randomUUID(), exercise: "", duration: "", calories: "" },
    ]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl shadow-sm p-4 md:p-6 space-y-4"
    >
      <div className="flex flex-col gap-1 max-w-xs">
        <label className="text-xs text-muted-foreground">기록 날짜</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`운동명 ${index + 1} (예: 스쿼트)`}
              value={item.exercise}
              onChange={(e) =>
                handleItemChange(item.id, "exercise", e.target.value)
              }
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="number"
              placeholder="시간(분)"
              value={item.duration}
              onChange={(e) =>
                handleItemChange(item.id, "duration", e.target.value)
              }
              className="w-24 px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-right"
            />
            <input
              type="number"
              placeholder="칼로리"
              value={item.calories}
              onChange={(e) =>
                handleItemChange(item.id, "calories", e.target.value)
              }
              className="w-28 px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-right"
            />

            <div className="flex gap-1">
              <button
                type="button"
                onClick={handleAddRow}
                className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleRemoveRow(item.id)}
                className="px-3 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm disabled:opacity-40"
                disabled={items.length === 1}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm hover:opacity-90 transition"
        >
          운동 기록 추가
        </button>
      </div>
    </form>
  );
}
