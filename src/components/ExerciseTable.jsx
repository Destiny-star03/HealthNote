// src/components/ExerciseTable.jsx
export default function ExerciseTable({ records, onDelete, onEdit }) {
  if (!records.length)
    return (
      <div className="bg-white p-6 mt-4 rounded-xl shadow text-center text-gray-500">
        운동 기록이 없습니다.
      </div>
    );

  return (
    <table className="bg-white p-6 mt-4 rounded-xl shadow w-full border">
      <thead>
        <tr className="bg-gray-50 text-gray-600">
          <th className="p-3 border">날짜</th>
          <th className="p-3 border">운동명</th>
          <th className="p-3 border">시간</th>
          <th className="p-3 border">칼로리</th>
          <th className="p-3 border">수정</th>
          <th className="p-3 border">삭제</th>
        </tr>
      </thead>

      <tbody>
        {records.map((r) => (
          <tr key={r.id} className="text-center hover:bg-gray-50">
            <td className="p-3 border">{r.date}</td>
            <td className="p-3 border">{r.exercise}</td>
            <td className="p-3 border">{r.duration}분</td>
            <td className="p-3 border text-green-600">{r.calories}</td>
            <td className="p-3 border">
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded"
                onClick={() => onEdit(r)}
              >
                수정
              </button>
            </td>
            <td className="p-3 border">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => onDelete(r.id)}
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
