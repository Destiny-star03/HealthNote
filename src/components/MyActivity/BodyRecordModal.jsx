// src/components/common/BodyRecordModal.jsx
import BodyForm from "../BodyForm";
import BodyTable from "../BodyTable";

export default function BodyRecordModal({
  bodyRecords,
  onAddBody,
  onUpdateBody,
  onDeleteBody,
  editingBody,
  setEditingBody,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-3xl mx-4 bg-sky-50 rounded-3xl shadow-xl border border-sky-100 relative">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-100">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              ⚖️ 체성분 기록 관리
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              날짜별로 하루 한 번만 기록되며, 기본값은 오늘 날짜입니다.
              필요하면 과거 날짜도 선택해서 기록할 수 있어요.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/70 border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-white transition"
          >
            ✕
          </button>
        </div>

        {/* 내용 영역 */}
        <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* 입력 폼 */}
          <div className="bg-white rounded-2xl border border-sky-100 px-4 py-4 shadow-sm">
            <BodyForm
              bodyRecords={bodyRecords}
              onAddBody={onAddBody}
              onUpdateBody={onUpdateBody}
              editingBody={editingBody}
              cancelEdit={() => setEditingBody(null)}
            />
          </div>

          {/* 최근 기록 테이블 */}
          <div className="bg-white rounded-2xl border border-sky-100 px-4 py-4 shadow-sm">
            <BodyTable
              records={bodyRecords}
              onDelete={onDeleteBody}
              onEdit={(record) => setEditingBody(record)}
            />
          </div>
        </div>

        {/* 하단 버튼 (선택 사항) */}
        <div className="flex justify-end gap-2 px-6 py-3 border-t border-sky-100 bg-sky-50 rounded-b-3xl">
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
