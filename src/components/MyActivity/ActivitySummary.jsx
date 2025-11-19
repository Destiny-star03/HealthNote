// src/components/MyActivity/ActivitySummary.jsx
export default function ActivitySummary({ stats }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">💪 최근 7일 요약</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">운동 횟수</p>
          <p className="text-2xl font-bold text-blue-600">{stats.workouts ?? 0}회</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">평균 운동시간</p>
          <p className="text-2xl font-bold text-green-600">{stats.avgDuration ?? 0}분</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">총 칼로리</p>
          <p className="text-2xl font-bold text-orange-600">{stats.totalCalories ?? 0}kcal</p>
        </div>
      </div>
    </div>
  );
}
