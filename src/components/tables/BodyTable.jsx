// src/components/BodyTable.jsx
export default function BodyTable({ records, onDelete, onEdit }) {
  // 비어 있을 때: 카드 바디 안에 들어갈 문구만
  if (!records || records.length === 0) {
    return (
      <p className="text-xs text-slate-400">
        아직 저장된 체성분 기록이 없습니다.
      </p>
    );
  }

  // 날짜 내림차순(최근 기록이 위로)
  const sortedRecords = [...records].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
      {sortedRecords.map((r) => (
        <div
          key={r.id}
          className="
            flex items-center justify-between gap-3
            rounded-2xl bg-sky-50 px-3 py-2 text-xs
          "
        >
          {/* 🔹 왼쪽: 클릭하면 수정 모드로 올리기 */}
          <button
            type="button"
            onClick={() => onEdit && onEdit(r)}
            className="
              flex flex-col flex-1 text-left
              cursor-pointer
              hover:bg-sky-100 rounded-xl px-2 py-1
              transition
            "
          >
            <span className="text-[11px] text-slate-500">{r.date}</span>
            <span className="text-[11px] text-slate-600 mt-0.5">
              {r.weight}kg / {r.muscle}kg / {r.fat}%
            </span>
          </button>

          {/* 🔹 오른쪽: 삭제 버튼 (클릭 전파 막기) */}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(r.id); // confirm 여부는 상위에서 처리
              }}
              className="
                flex items-center justify-center
                w-7 h-7
                rounded-full bg-red-50 text-red-500
                text-xs border border-red-100
                hover:bg-red-100
                transition
              "
            >
              🗑
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
