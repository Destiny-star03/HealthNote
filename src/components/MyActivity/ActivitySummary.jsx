// src/components/MyActivity/ActivitySummary.jsx

export default function ActivitySummary({ stats }) {
  const workouts = stats?.workouts ?? 0;
  const avgDuration = stats?.avgDuration ?? 0;
  const totalCalories = stats?.totalCalories ?? 0;

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-5 lg:p-6 shadow-sm h-full">
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 lg:px-6 lg:py-5 shadow-sm h-full flex flex-col">
        {/* 제목 */}
        <h2 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
          <span className="text-sky-500 text-xl">📊</span>
          <span>최근 7일 요약</span>
        </h2>

        {/* 3개 요약 카드 (PC 기준 크게) */}
        <div className="flex flex-col gap-4 flex-1">
          <SummaryCard
            icon="📈"
            label="운동횟수"
            value={`${workouts}회`}
          />
          <SummaryCard
            icon="⏱️"
            label="평균 시간"
            value={`${avgDuration}분`}
          />
          <SummaryCard
            icon="🔥"
            label="총 칼로리"
            value={`${totalCalories.toLocaleString()}kcal`}
          />
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="flex-1 min-h-[88px] bg-sky-50 rounded-2xl px-4 py-3 lg:px-5 lg:py-4 shadow-inner flex items-center justify-between">
      {/* 왼쪽: 아이콘 + 라벨 */}
      <div className="flex items-center gap-3">
        <span className="text-2xl text-sky-500">{icon}</span>
        <span className="text-sm lg:text-base font-medium text-sky-600">
          {label}
        </span>
      </div>

      {/* 오른쪽: 값 */}
      <div className="text-right">
        <p className="text-base lg:text-xl font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}
