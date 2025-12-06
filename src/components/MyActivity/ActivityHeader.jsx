// src/components/MyActivity/ActivityHeader.jsx

// 공통 숫자 + 단위 포맷 함수
function formatStat(value, unit = "", digits = 1) {
  if (value == null) return "-";
  const num = Number(value);
  if (Number.isNaN(num)) return "-";
  return `${num.toFixed(digits)}${unit}`;
}

export default function ActivityHeader({ latestBody, onOpenBodyModal }) {
  const hasBody = !!latestBody;

  // ===== 1. 기록이 하나도 없을 때 =====
  if (!hasBody) {
    return (
      <section className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
        <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 sm:px-8 sm:py-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">
              최근 체성분 기록
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              아직 체성분 기록이 없습니다. 아래 기록 관리에서 첫 기록을 추가해
              보세요.
            </p>
          </div>

          {onOpenBodyModal && (
            <HeaderButton onClick={onOpenBodyModal}>기록 관리</HeaderButton>
          )}
        </div>
      </section>
    );
  }

  // ===== 2. 최근 기록이 있는 경우 =====
  const { date, weight, muscle, fat } = latestBody;

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 sm:px-8 sm:py-6 shadow-sm">
        {/* 상단 제목 + 기록 관리 버튼 */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">
              최근 체성분 기록
            </h2>
            {date && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                측정일:{" "}
                <span className="text-sky-600 font-semibold">{date}</span>
              </p>
            )}
          </div>

          {onOpenBodyModal && (
            <HeaderButton onClick={onOpenBodyModal}>기록 관리</HeaderButton>
          )}
        </div>

        {/* 하단 3개 pill 카드 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <StatPill label="체중" value={formatStat(weight, "kg")} />
          <StatPill label="근육량" value={formatStat(muscle, "kg")} />
          <StatPill label="체지방률" value={formatStat(fat, "%")} />
        </div>
      </div>
    </section>
  );
}

/** 상단 우측 공통 버튼 */
function HeaderButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        px-4 py-2
        rounded-full
        text-xs sm:text-sm
        bg-sky-500 text-white font-medium
        shadow-sm
        hover:bg-sky-600
        transition
      "
    >
      {children}
    </button>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="flex-1 min-w-[90px] px-4 py-3 bg-sky-50 rounded-2xl shadow-inner text-center">
      <p className="text-xs text-sky-500 mb-1">{label}</p>
      <p className="text-sm sm:text-base font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}
