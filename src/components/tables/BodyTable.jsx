// src/components/BodyTable.jsx
export default function BodyTable({ records, onDelete, onEdit }) {
  if (!records || records.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-sky-100 px-4 py-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-600 mb-2">최근 기록</p>
        <p className="text-xs text-slate-400">아직 저장된 체성분 기록이 없습니다.</p>
      </div>
    );
  }

  // 날짜 내림차순(최근 기록이 위로)
  const sortedRecords = [...records].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <div className="bg-white rounded-2xl border border-sky-100 px-4 py-3 shadow-sm">
      <p className="text-xs font-semibold text-slate-600 mb-2">최근 기록</p>

      <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
        {sortedRecords.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-3 rounded-2xl bg-sky-50 px-3 py-2 text-xs cursor-pointer hover:bg-sky-100 transition"
            onClick={() => onEdit && onEdit(r)} // 클릭하면 폼으로 올리기
          >
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500">{r.date}</span>
              <span className="text-[11px] text-slate-600">
                {r.weight}kg / {r.muscle}kg / {r.fat}%
              </span>
            </div>

            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(r.id); // confirm 여부는 부모에서 처리
                }}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-red-50 text-red-500 text-xs border border-red-100 hover:bg-red-100"
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
