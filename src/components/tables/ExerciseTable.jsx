// src/components/ExerciseTable.jsx
export default function ExerciseTable({ records, onDelete, onEdit }) {
  if (!records || records.length === 0) {
    return (
      <div className="text-xs text-slate-400">
        아직 저장된 운동 기록이 없습니다.
      </div>
    );
  }

  // 날짜 내림차순 → 같은 날짜는 입력 순서대로
  const sorted = [...records].sort((a, b) => {
    if (a.date === b.date) return b.id - a.id;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
      {sorted.map((r) => (
        <div
          key={r.id}
          className="
            flex items-center justify-between gap-3
            rounded-2xl
            bg-sky-50
            px-3 py-2.5
            text-xs
            shadow-inner
          "
        >
          {/* 🔹 왼쪽: 기록 선택 영역 (클릭 시 수정 모드 진입) */}
          <button
            type="button"
            onClick={() => onEdit && onEdit(r)}
            className="
              flex flex-col flex-1 text-left
              rounded-xl px-1 py-0.5
              hover:bg-sky-100/80
              transition
            "
          >
            <span className="text-[11px] text-slate-500 mb-0.5">
              {r.date}
            </span>
            <span className="text-[13px] text-slate-700 font-medium">
              {r.exercise}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              {r.duration}분 · {r.calories}kcal
            </span>
          </button>

          {/* 🔹 오른쪽: 삭제 버튼 */}
          <button
            type="button"
            onClick={() => { onDelete && onDelete(r.id);}}
            className="
              flex items-center justify-center
              w-7 h-7
              rounded-full
              bg-red-50
              text-red-500
              text-xs
              border border-red-100
              hover:bg-red-100
              transition
            "
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}
