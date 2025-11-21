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
}) {
  const latestBody =
    bodyRecords && bodyRecords.length > 0
      ? bodyRecords[bodyRecords.length - 1]
      : null;

  const totalWorkouts = exerciseRecords.length;
  const totalCalories = exerciseRecords.reduce((a, c) => a + c.calories, 0);
  const avgDuration = Math.round(
    (exerciseRecords.reduce((a, c) => a + c.duration, 0) /
      (totalWorkouts || 1)) || 0
  );

  const stats = {
    workouts: totalWorkouts,
    totalCalories,
    avgDuration,
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
        <ActivityHeader latestBody={latestBody} />

        {/* 2. 체성분 변화 추이 그래프 */}
        <ActivityChart bodyRecords={bodyRecords}  profile={profile}/>

        {/* 3. 최근 운동기록 */}
        <ActivityExerciseList exercises={exerciseRecords} />

        {/* 4. (옵션) 체성분 / 운동 기록 관리 폼들 */}
        {/* BodyForm, ExerciseForm, 테이블 등 */}
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
        {/* 작은 화면에서는 아래쪽에 붙고, 큰 화면에서는 오른쪽 고정 */}
        <ActivityGoalPanel
          goals={goals}
          latestBody={latestBody}
          onSaveGoals={onSaveGoals}
        />
        <ActivitySummary stats={stats} />
        
      </aside>
    </section>
  );
}
