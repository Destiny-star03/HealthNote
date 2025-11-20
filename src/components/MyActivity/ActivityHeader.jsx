// src/components/MyActivity/ActivityHeader.jsx
export default function ActivityHeader({ latestBody }) {
  if (!latestBody)
    return (
      <div className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 text-center">
        <p className="text-sm text-slate-500">
          아직 체성분 기록이 없습니다. 아래에서 첫 기록을 추가해 보세요.
        </p>
      </div>
    );

  const { date, weight, muscle, fat } = latestBody;

  // 숫자 포맷 함수 (소수점 1자리까지, 값 없으면 "-")
  const formatNumber = (value, digits = 1) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return Number(value).toFixed(digits);
  };

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
      {/* 안쪽 흰 카드 */}
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 sm:px-8 sm:py-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            최근 체성분 기록
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            측정일:{" "}
            <span className="text-sky-600 font-semibold">{date}</span>
          </p>
        </div>

        {/* 아래 3개의 둥근 카드 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <StatPill
            label="체중"
            value={`${formatNumber(weight, 1)}kg`}
          />
          <StatPill
            label="근육량"
            value={`${formatNumber(muscle, 1)}kg`}
          />
          <StatPill
            label="체지방률"
            value={`${formatNumber(fat, 1)}%`}
          />
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
