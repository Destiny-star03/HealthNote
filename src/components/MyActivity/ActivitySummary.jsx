// src/components/MyActivity/ActivitySummary.jsx

export default function ActivitySummary({ stats }) {
  const workouts = stats?.workouts ?? 0;
  const avgDuration = stats?.avgDuration ?? 0;
  const totalCalories = stats?.totalCalories ?? 0;

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm h-full">
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 sm:px-6 sm:py-5 shadow-sm h-full flex flex-col">
        {/* 제목 */}
        <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-4">
          최근 7일 요약
        </h2>

        {/* 3개 요약 카드 */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <SummaryPill
            icon="📈"
            label="운동횟수"
            value={`${workouts}회`}
          />
          <SummaryPill
            icon="⏱️"
            label="평균 시간"
            value={`${avgDuration}분`}
          />
          <SummaryPill
            icon="🔥"
            label="총 칼로리"
            value={`${totalCalories.toLocaleString()}kcal`}
          />
        </div>
      </div>
    </section>
  );
}

function SummaryPill({ icon, label, value }) {
  return (
    <div className="flex-1 min-w-[90px] px-4 py-3 bg-sky-50 rounded-2xl shadow-inner text-center flex flex-col justify-center">
      <span className="text-lg mb-1 text-sky-500">{icon}</span>
      <p className="text-xs text-sky-500 mb-1">{label}</p>
      <p className="text-sm sm:text-base font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}
