// src/components/MyActivity/ActivityGoalPanel.jsx
export default function ActivityGoalPanel({ goals, latestBody }) {
  if (!goals || !latestBody)
    return (
      <div className="bg-white p-5 rounded-xl shadow text-center text-gray-500">
        목표 또는 체성분 정보가 없습니다.
      </div>
    );

  const weightProgress = Math.min(
    ((goals.weight / latestBody.weight) * 100).toFixed(1),
    100
  );
  const muscleProgress = Math.min(
    ((latestBody.muscle / goals.muscle) * 100).toFixed(1),
    100
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">🎯 목표 달성률</h3>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          목표 체중: {goals.weight}kg (현재 {latestBody.weight}kg)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${weightProgress}%` }}
          ></div>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600">
          목표 근육량: {goals.muscle}kg (현재 {latestBody.muscle}kg)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
          <div
            className="bg-green-500 h-4 rounded-full transition-all"
            style={{ width: `${muscleProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
