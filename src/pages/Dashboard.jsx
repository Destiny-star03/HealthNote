// src/pages/Dashboard.jsx
import ActivityHeader from "../components/MyActivity/ActivityHeader";
import ActivityChart from "../components/MyActivity/ActivityChart";
import ActivitySummary from "../components/MyActivity/ActivitySummary";
import ActivityExerciseList from "../components/MyActivity/ActivityExerciseList";
import ActivityGoalPanel from "../components/MyActivity/ActivityGoalPanel";

export default function Dashboard({
  bodyRecords,
  exerciseRecords,
  goals,
  onSaveGoals,
  profile,
  onOpenBodyModal,
  onOpenExerciseModal,
}) {
  const latestBody =
    bodyRecords && bodyRecords.length > 0
      ? bodyRecords[bodyRecords.length - 1]
      : null;

  /* 🔹 1. 최근 7일 운동만 필터링 */
  const today = new Date();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const recentExercises = (exerciseRecords || []).filter((ex) => {
    if (!ex.date) return false;
    const d = new Date(ex.date);
    if (isNaN(d)) return false;

    const diffDays = (today - d) / MS_PER_DAY;
    // 오늘 기준 0일 ~ 6일 전까지 → 최근 7일
    return diffDays >= 0 && diffDays < 7;
  });

  /* 🔹 2. 최근 7일 기준 stats 계산 */
  const totalWorkouts = recentExercises.length;
  const totalCalories = recentExercises.reduce(
    (acc, cur) => acc + (Number(cur.calories) || 0),
    0
  );
  const totalDuration = recentExercises.reduce(
    (acc, cur) => acc + (Number(cur.duration) || 0),
    0
  );
  const avgDuration =
    totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
  const activeDays = new Set(recentExercises.map(e => e.date)).size;
  const stats = {
    workouts: totalWorkouts,
    totalCalories,
    avgDuration,
    activeDays,
  };

  return (
    <section
      className="
        max-w-7xl mx-auto
        px-4
        flex flex-col xl:flex-row
        gap-6
      "
    >
      {/* 🔹 왼쪽 메인 영역 (카드들이 위에서 아래로) */}
      <div className="flex-1 space-y-6">
        {/* 1. 최근 체성분 */}
        <ActivityHeader
          latestBody={latestBody}
          onOpenBodyModal={onOpenBodyModal}
        />

        {/* 2. 체성분 변화 추이 그래프 */}
        <ActivityChart bodyRecords={bodyRecords} profile={profile} />

        {/* 3. 최근 운동기록 리스트 (여기는 전체 운동 기록 사용) */}
        <ActivityExerciseList
          exercises={exerciseRecords}
          onOpenRecordModal={onOpenExerciseModal}
        />
      </div>

      {/* 🔹 오른쪽 사이드바 (최근 7일 요약 + 목표 달성률) */}
      <aside
        className="
          w-full xl:w-80
          xl:sticky xl:top-6
          xl:self-start
          space-y-6
        "
      >
        <ActivityGoalPanel
          goals={goals}
          latestBody={latestBody}
          onSaveGoals={onSaveGoals}
        />
        {/* ✅ 여기서 보여주는 값만 'recentExercises' 기준 */}
        <ActivitySummary stats={stats} />
      </aside>
    </section>
  );
}
