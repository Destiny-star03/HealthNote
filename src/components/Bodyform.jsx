// src/components/BodyForm.jsx
import { useState, useEffect } from "react";

export default function BodyForm({
  bodyRecords,
  onAddBody,
  onUpdateBody,
  editingBody,
  cancelEdit,
}) {
  const [form, setForm] = useState({
    date: "",
    weight: "",
    muscle: "",
    fat: "",
  });

  // 🔹 수정 모드일 때 기존 값 채우기
  useEffect(() => {
    if (editingBody) {
      setForm({
        date: editingBody.date,
        weight: editingBody.weight,
        muscle: editingBody.muscle,
        fat: editingBody.fat,
      });
    } else {
      setForm({ date: "", weight: "", muscle: "", fat: "" });
    }
  }, [editingBody]);

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 날짜 중복 체크 (자기 자신은 허용)
    const exists = bodyRecords.find(
      (r) =>
        r.date === form.date &&
        (!editingBody || r.id !== editingBody.id)
    );
    if (exists) {
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

    if (editingBody) {
      onUpdateBody(payload);
    } else {
      onAddBody(payload);
    }

    setForm({ date: "", weight: "", muscle: "", fat: "" });
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
        type="number"
        name="weight"
        value={form.weight}
        placeholder="체중(kg)"
        onChange={onChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="muscle"
        value={form.muscle}
        placeholder="근육량(kg)"
        onChange={onChange}
        required
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="fat"
        value={form.fat}
        placeholder="체지방률(%)"
        onChange={onChange}
        required
        className="p-2 border rounded"
      />

      <div className="col-span-4 flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white rounded p-2 font-bold"
        >
          {editingBody ? "체성분 기록 수정" : "체성분 기록 추가"}
        </button>

        {editingBody && (
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
