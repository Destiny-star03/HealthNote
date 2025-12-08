// src/pages/Dashboard.jsx
import { useMemo } from "react";             // ✅ 추가
import RecentBodyRecordCard from "../components/MyActivity/RecentBodyRecordCard";
import Chart from "../components/MyActivity/Chart";
import ActivitySummary from "../components/MyActivity/ActivitySummary";
import ExerciseList from "../components/MyActivity/ExerciseList";
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
  //날짜 기준으로 "오늘과 가장 가까운 기록" 구하기
  const latestBody = useMemo(() => {
    if (!Array.isArray(bodyRecords) || bodyRecords.length === 0) return null;

    const todayStr = new Date().toISOString().slice(0, 10);

    // 오늘 또는 과거 날짜만 후보로
    const candidates = bodyRecords.filter(
      (r) => r.date && r.date <= todayStr
    );

    const targetList = candidates.length > 0 ? candidates : bodyRecords;

    // 날짜 내림차순 정렬 후 첫 번째 = 가장 최근 날짜
    return [...targetList].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0];
  }, [bodyRecords]);

  /*1. 최근 7일 운동만 필터링 */
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

  /*2. 최근 7일 기준 stats 계산 */
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
  const activeDays = new Set(recentExercises.map((e) => e.date)).size;
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
      {/*왼쪽 메인 영역 (카드들이 위에서 아래로) */}
      <div className="flex-1 space-y-6">
        {/* 1. 최근 체성분 */}
        <RecentBodyRecordCard
          latestBody={latestBody}
          onOpenBodyModal={onOpenBodyModal}
        />

        {/* 2. 체성분 변화 추이 그래프 */}
        <Chart bodyRecords={bodyRecords} profile={profile} />

        {/* 3. 최근 운동기록 리스트 (여기는 전체 운동 기록 사용) */}
        <ExerciseList
          exercises={exerciseRecords}
          onOpenRecordModal={onOpenExerciseModal}
        />
      </div>

      {/*오른쪽 사이드바 (최근 7일 요약 + 목표 달성률) */}
      <aside
        className="
          w-full xl:w-80
          xl:sticky xl:top-20
          xl:self-start
          space-y-6
        "
      >
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
