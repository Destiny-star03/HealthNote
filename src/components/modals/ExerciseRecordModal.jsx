// src/components/common/ExerciseRecordModal.jsx
import ExerciseForm from "../forms/ExerciseForm";
import ExerciseTable from "../tables/ExerciseTable";

export default function ExerciseRecordModal({
  exerciseRecords = [],
  onAddExercises,
  onDeleteExercise,
  onClose,
}) {
  // 오버레이(배경) 클릭 시 닫기 – 카드 내용 클릭은 무시
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
      {/* 안쪽 카드 – 클릭해도 모달 안 닫히도록 */}
      <div
        className="w-full max-w-lg mx-4 bg-sky-50 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.35)] border border-sky-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-sky-100 bg-sky-50/80">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏋️</span>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                운동 기록 관리
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                날짜·운동명·시간·칼로리를 기록하고, 아래에서 최근 운동 기록을
                확인할 수 있어요.
              </p>
            </div>
          </div>

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
          {/* 🔹 위쪽: 입력 폼 */}
          <div className="bg-white rounded-2xl border border-sky-100 px-4 py-4 shadow-sm">
            <ExerciseForm onAddExercises={onAddExercises} />
          </div>

          {/* 🔹 아래쪽: 최근 기록 리스트 영역 */}
          <div className="bg-white rounded-2xl border border-sky-100 px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold text-slate-600 mb-2">
              최근 기록
            </p>

            <div className="max-h-64 overflow-y-auto pr-1">
              <ExerciseTable
                records={exerciseRecords}
                onDelete={onDeleteExercise}
              />
            </div>
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
