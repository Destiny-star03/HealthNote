// src/components/MyActivity/ActivityHeader.jsx
export default function ActivityHeader({ latestBody }) {
  if (!latestBody)
    return (
      <div className="bg-white p-5 rounded-xl shadow text-center text-gray-500">
        최근 체성분 기록이 없습니다.
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-blue-600">나의 활동</h2>
        <p className="text-gray-500 text-sm mt-1">
          최근 측정일: <span className="font-semibold">{latestBody.date}</span>
        </p>
      </div>

      <div className="flex gap-6 text-center">
        <div>
          <p className="text-gray-500 text-sm">체중</p>
          <p className="text-lg font-bold text-blue-600">{latestBody.weight}kg</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">근육</p>
          <p className="text-lg font-bold text-green-600">{latestBody.muscle}kg</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">체지방</p>
          <p className="text-lg font-bold text-orange-600">{latestBody.fat}%</p>
        </div>
      </div>
    </div>
  );
}
