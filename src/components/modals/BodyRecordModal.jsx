// src/components/common/BodyRecordModal.jsx
import BodyForm from "../forms/BodyForm";
import BodyTable from "../tables/BodyTable";

export default function BodyRecordModal({
  bodyRecords = [],
  onAddBody,
  onUpdateBody,
  onDeleteBody,
  editingBody,
  setEditingBody,
  onClose,
}) {
  // 오버레이(배경) 클릭 시 닫기 – 안쪽 카드 클릭은 무시
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-lg mx-4 bg-sky-50 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.35)] border border-sky-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-sky-100 bg-sky-50/80">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            체성분 기록 관리
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-white transition"
          >
            ✕
          </button>
        </div>

        {/* 내용 영역 */}
        <div className="px-5 py-4 space-y-4 bg-sky-50">
          {/* 입력 폼 카드 (위쪽) */}
          <div className="bg-white rounded-2xl border border-sky-100 px-4 py-4 shadow-sm">
            <BodyForm
              bodyRecords={bodyRecords}
              onAddBody={onAddBody}
              onUpdateBody={onUpdateBody}
              editingBody={editingBody}
              cancelEdit={() => setEditingBody(null)}
              onDeleteBody={onDeleteBody}
            />
          </div>

          {/* 최근 기록 리스트 (아래쪽) */}
          <div className="bg-white rounded-2xl border border-sky-100 px-4 py-3 shadow-sm max-h-64 overflow-y-auto">
            <BodyTable
              records={bodyRecords}
              onDelete={onDeleteBody}
              onEdit={setEditingBody}
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2 px-5 py-3 border-t border-sky-100 bg-sky-50/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
