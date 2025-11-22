// src/components/BodyForm.jsx
import { useEffect, useState } from "react";

export default function BodyForm({
  bodyRecords,
  onAddBody,
  onUpdateBody,
  editingBody,
  cancelEdit,
  // 선택: 폼 옆 휴지통 버튼으로도 삭제하고 싶을 때 넘겨 써도 됨
  onDeleteBody,
}) {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [weight, setWeight] = useState("");
  const [muscle, setMuscle] = useState("");
  const [fat, setFat] = useState("");

  // 편집 모드일 때 값 채우기
  useEffect(() => {
    if (editingBody) {
      setDate(editingBody.date);
      setWeight(editingBody.weight ?? "");
      setMuscle(editingBody.muscle ?? "");
      setFat(editingBody.fat ?? "");
    } else {
      setDate(today);
      setWeight("");
      setMuscle("");
      setFat("");
    }
  }, [editingBody, today]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const record = {
      id: editingBody ? editingBody.id : Date.now(),
      date,
      weight: weight !== "" ? Number(weight) : null,
      muscle: muscle !== "" ? Number(muscle) : null,
      fat: fat !== "" ? Number(fat) : null,
    };

    if (editingBody) {
      onUpdateBody && onUpdateBody(record);
    } else {
      onAddBody && onAddBody(record);
    }

    if (!editingBody) {
      setWeight("");
      setMuscle("");
      setFat("");
    }
  };

  const handleDeleteClick = () => {
    if (!editingBody || !onDeleteBody) return;
    if (!confirm("현재 선택된 체성분 기록을 삭제할까요?")) return;
    onDeleteBody(editingBody.id);
    cancelEdit && cancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 날짜 */}
      <div className="space-y-1">
        <label className="flex items-center gap-1 text-xs font-medium text-sky-700">
          <span className="text-sky-500">📅</span>
          <span>날짜</span>
        </label>
        <div className="relative">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              w-full rounded-3xl border border-sky-200 bg-rose-50/60
              px-4 py-2.5 text-sm text-slate-800
              focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300
              placeholder:text-slate-300
            "
          />
        </div>
      </div>

      {/* 체중 / 근육량 / 체지방률 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field
          label="체중 (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Field
          label="근육량 (kg)"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
        />
        <Field
          label="체지방률 (%)"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="
            flex-1 inline-flex items-center justify-center gap-2
            rounded-full bg-sky-500 px-4 py-2.5
            text-sm font-semibold text-white
            shadow-[0_10px_20px_rgba(59,130,246,0.35)]
            hover:bg-sky-600 active:scale-[0.99] transition
          "
        >
          {/* 아이콘 */}
          <span className="text-base">💾</span>
          <span>{editingBody ? "수정" : "추가"}</span>
        </button>

        {/* 휴지통 버튼 (편집 모드 + onDeleteBody 있을 때만 의미 있음) */}
        {editingBody && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="
              flex items-center justify-center
              w-10 h-10 rounded-full
              border border-rose-200 bg-rose-50
              text-rose-500 hover:bg-rose-100 hover:border-rose-300
              transition
            "
          >
            🗑
          </button>
        )}
      </div>
    </form>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-medium text-sky-700">{label}</label>
      <input
        type="number"
        step="0.1"
        value={value}
        onChange={onChange}
        className="
          w-full rounded-3xl border border-sky-200 bg-rose-50/60
          px-4 py-2 text-sm text-slate-800
          focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300
          placeholder:text-slate-300
        "
      />
    </div>
  );
}
