// src/components/BodyTable.jsx
export default function BodyTable({ records, onDelete, onEdit }) {
  if (!records.length)
    return (
      <div className="bg-white p-6 mt-4 rounded-xl shadow text-center text-gray-500">
        기록이 없습니다.
      </div>
    );

  return (
    <table className="bg-white mt-4 rounded-xl shadow w-full border">
      <thead>
        <tr className="bg-gray-50 text-gray-600">
          <th className="p-3 border">날짜</th>
          <th className="p-3 border">체중</th>
          <th className="p-3 border">근육</th>
          <th className="p-3 border">체지방</th>
          <th className="p-3 border">수정</th>
          <th className="p-3 border">삭제</th>
        </tr>
      </thead>

      <tbody>
        {records.map((r) => (
          <tr key={r.id} className="text-center hover:bg-gray-50">
            <td className="p-3 border">{r.date}</td>
            <td className="p-3 border font-semibold">{r.weight}kg</td>
            <td className="p-3 border font-semibold">{r.muscle}kg</td>
            <td className="p-3 border font-semibold">{r.fat}%</td>
            <td className="p-3 border">
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded"
                onClick={() => onEdit(r)}
              >
                수정
              </button>
            </td>
            <td className="border p-3">
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
