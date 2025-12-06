// src/components/BodyForm.jsx
import { useEffect, useState } from "react";

export default function BodyForm({
  onAddBody,
  onUpdateBody,
  editingBody,
  cancelEdit,   // 편집 취소 콜백
}) {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [weight, setWeight] = useState("");
  const [muscle, setMuscle] = useState("");
  const [fat, setFat] = useState("");

  // 편집 모드일 때 값 채우기 / 아니면 초기화
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

    if (!weight || !muscle || !fat) {
      alert("체중, 근육량, 체지방률을 모두 입력해주세요.");
      return;
    }

    if (weight <= 0 || muscle <= 0 || fat <= 0) {
      alert("0보다 큰 값만 입력할 수 있습니다.");
      return;
    }

    const record = {
      id: editingBody ? editingBody.id : Date.now(),
      date,
      weight,
      muscle,
      fat,
    };

    if (editingBody) {
      onUpdateBody && onUpdateBody(record);
    } else {
      onAddBody && onAddBody(record);
      // 새로 추가일 때만 입력값 초기화
      setWeight("");
      setMuscle("");
      setFat("");
    }
  };

  const handleCancelEdit = () => {
    // 단순히 편집만 종료 → editingBody를 null로 만드는 건 부모 역할
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
            max={today}
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
          <span className="text-base">💾</span>
          <span>{editingBody ? "수정" : "추가"}</span>
        </button>

        {editingBody && (
          <button
            type="button"
            onClick={handleCancelEdit}
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

function Field({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-medium text-sky-700">{label}</label>
      <input
        type="number"
        step="0.1"
        min="0"
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
