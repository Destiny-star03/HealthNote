import ActivityHeader from "../components/MyActivity/ActivityHeader";
import ActivityChart from "../components/MyActivity/ActivityChart";
import ActivitySummary from "../components/MyActivity/ActivitySummary";
import ActivityExerciseList from "../components/MyActivity/ActivityExerciseList";
import ActivityGoalPanel from "../components/MyActivity/ActivityGoalPanel";

export default function Dashboard({ bodyRecords, exerciseRecords, goals }) {
  const latestBody =
    bodyRecords.length > 0 ? bodyRecords[bodyRecords.length - 1] : null;

  // 운동 통계 계산
  const totalWorkouts = exerciseRecords.length;
  const totalCalories = exerciseRecords.reduce((a, c) => a + c.calories, 0);
  const avgDuration = Math.round(
    (exerciseRecords.reduce((a, c) => a + c.duration, 0) / totalWorkouts) || 0
  );

  const stats = {
    workouts: totalWorkouts,
    totalCalories,
    avgDuration,
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      <ActivityHeader latestBody={latestBody} />
      <ActivityChart bodyRecords={bodyRecords} />
      <ActivitySummary stats={stats} />
      <ActivityExerciseList exercises={exerciseRecords} />
      <ActivityGoalPanel goals={goals} latestBody={latestBody} />
    </div>
  );
}
