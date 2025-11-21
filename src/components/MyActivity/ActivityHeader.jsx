// 기존 import 그대로 두고, props에 onOpenBodyModal 추가
export default function ActivityHeader({ latestBody, onOpenBodyModal }) {
  if (!latestBody)
    return (
      <div className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 text-center">
        <p className="text-sm text-slate-500">
          아직 체성분 기록이 없습니다. 아래에서 첫 기록을 추가해 보세요.
        </p>
      </div>
    );

  const { date, weight, muscle, fat } = latestBody;

  const formatNumber = (value, digits = 1) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return Number(value).toFixed(digits);
  };

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 sm:px-8 sm:py-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">
              최근 체성분 기록
            </h2>
            {date && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                측정일: <span className="text-sky-600 font-semibold">{date}</span>
              </p>
            )}
          </div>

          {onOpenBodyModal && (
            <button
              type="button"
              onClick={onOpenBodyModal}
              className="px-4 py-2 rounded-full text-xs sm:text-sm bg-sky-500 text-white font-medium shadow-sm hover:bg-sky-600 transition"
            >
              기록 관리
            </button>
          )}
        </div>

        {/* 🔹 아래 3개의 둥근 카드 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <StatPill label="체중" value={`${formatNumber(weight, 1)}kg`} />
          <StatPill label="근육량" value={`${formatNumber(muscle, 1)}kg`} />
          <StatPill label="체지방률" value={`${formatNumber(fat, 1)}%`} />
        </div>
      </div>
    </section>
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
