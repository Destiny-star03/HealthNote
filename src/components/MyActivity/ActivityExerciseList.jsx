// src/components/MyActivity/ActivityExerciseList.jsx
export default function ActivityExerciseList({ exercises }) {
  if (!exercises || exercises.length === 0)
    return (
      <div className="bg-white p-5 rounded-xl shadow text-center text-gray-500">
        운동 기록이 없습니다.
      </div>
    );

  const recent = [...exercises]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">🗓️ 최근 운동 기록</h3>
      <table className="w-full text-center border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border">날짜</th>
            <th className="p-2 border">운동명</th>
            <th className="p-2 border">시간(분)</th>
            <th className="p-2 border">칼로리(kcal)</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((ex) => (
            <tr key={ex.id} className="hover:bg-gray-50">
              <td className="border p-2">{ex.date}</td>
              <td className="border p-2">{ex.exercise}</td>
              <td className="border p-2">{ex.duration}</td>
              <td className="border p-2 text-blue-600 font-semibold">{ex.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
