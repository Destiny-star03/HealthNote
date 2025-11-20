// src/components/BodyForm.jsx
import { useState, useEffect } from "react";

function getTodayString() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export default function BodyForm({
  bodyRecords,
  onAddBody,
  onUpdateBody,
  editingBody,
  cancelEdit,
}) {
  const [form, setForm] = useState({
    date: getTodayString(),
    weight: "",
    muscle: "",
    fat: "",
  });

  useEffect(() => {
    if (editingBody) {
      setForm({
        date: editingBody.date,
        weight: editingBody.weight,
        muscle: editingBody.muscle,
        fat: editingBody.fat,
      });
    } else {
      setForm({
        date: getTodayString(),
        weight: "",
        muscle: "",
        fat: "",
      });
    }
  }, [editingBody]);

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = bodyRecords.find(
      (r) =>
        r.date === form.date &&
        (!editingBody || r.id !== editingBody.id)
    );
    if (exists && !editingBody) {
      alert("해당 날짜의 체성분 기록이 이미 존재합니다.");
      return;
    }

    const payload = {
      ...(editingBody || { id: crypto.randomUUID() }),
      date: form.date,
      weight: Number(form.weight),
      muscle: Number(form.muscle),
      fat: Number(form.fat),
    };

    if (editingBody) onUpdateBody(payload);
    else onAddBody(payload);

    setForm({
      date: getTodayString(),
      weight: "",
      muscle: "",
      fat: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl shadow-sm p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">날짜</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={onChange}
          required
          className="px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <input
        type="number"
        name="weight"
        value={form.weight}
        placeholder="체중(kg)"
        onChange={onChange}
        required
        className="px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        type="number"
        name="muscle"
        value={form.muscle}
        placeholder="근육량(kg)"
        onChange={onChange}
        required
        className="px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        type="number"
        name="fat"
        value={form.fat}
        placeholder="체지방률(%)"
        onChange={onChange}
        required
        className="px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="md:col-span-4 flex gap-2 justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm hover:opacity-90 transition"
        >
          {editingBody ? "체성분 기록 수정" : "체성분 기록 추가"}
        </button>
        {editingBody && (
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted/40 transition"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
