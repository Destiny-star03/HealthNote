// src/components/MyActivity/ActivitySummary.jsx

// 안전하게 숫자 처리하는 헬퍼
function toSafeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isNaN(num) ? fallback : num;
}

export default function ActivitySummary({ stats }) {
  const {
    workouts = 0,
    avgDuration = 0,
    totalCalories = 0,
    activeDays, 
  } = stats || {};

  //운동한 '날짜 수'가 넘어오면 우선 사용, 없으면 workouts로 대체
  const workoutDays =
    typeof activeDays === "number" ? activeDays : workouts;

  //3일 이상 운동했으면 하이라이트
  const hitWorkoutGoal = workoutDays >= 3;

  //화면에 보여줄 문자열 미리 준비
  const workoutsLabel = `${toSafeNumber(workouts)}회`;
  const avgDurationLabel = `${toSafeNumber(avgDuration)}분`;
  const totalCaloriesLabel = `${toSafeNumber(totalCalories).toLocaleString()}kcal`;

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-5 lg:p-6 shadow-sm h-full">
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 lg:px-6 lg:py-5 shadow-sm h-full flex flex-col">
        {/* 제목 */}
        <h2 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
          <span className="text-sky-500 text-xl">📊</span>
          <span>최근 7일 요약</span>
        </h2>

        {/* 3개 요약 카드 */}
        <div className="flex flex-col gap-4 flex-1">
          {/* 🔹 운동횟수 카드: 3일 이상이면 강조 */}
          <SummaryCard
            icon="📈"
            label="운동횟수"
            value={workoutsLabel}
            highlight={hitWorkoutGoal}
            badgeText={hitWorkoutGoal ? "3일 이상 운동 달성!" : undefined}
          />

          <SummaryCard
            icon="⏱️"
            label="평균 시간"
            value={avgDurationLabel}
          />

          <SummaryCard
            icon="🔥"
            label="총 칼로리"
            value={totalCaloriesLabel}
          />
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ icon, label, value, highlight = false, badgeText }) {
  const baseClass =
    "flex-1 min-h-[88px] rounded-2xl px-4 py-3 lg:px-5 lg:py-4 shadow-inner flex items-center justify-between transition-colors";

  const colorClass = highlight
    ? "bg-emerald-50 border border-emerald-200"
    : "bg-sky-50 border border-sky-100";

  const valueTextClass = highlight
    ? "text-base lg:text-xl font-semibold text-emerald-700"
    : "text-base lg:text-xl font-semibold text-slate-800";

  return (
    <div className={`${baseClass} ${colorClass}`}>
      {/* 왼쪽: 아이콘 + 라벨 + (배지) */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="text-2xl text-sky-500">{icon}</span>
          <span className="text-sm lg:text-base font-medium text-sky-600">
            {label}
          </span>
        </div>

        {highlight && badgeText && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-700 mt-0.5">
            ✅ {badgeText}
          </span>
        )}
      </div>

      {/* 오른쪽: 값 */}
      <div className="text-right">
        <p className={valueTextClass}>{value}</p>
      </div>
    </div>
  );
}
