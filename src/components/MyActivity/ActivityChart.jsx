// src/components/MyActivity/ActivityChart.jsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function ActivityChart({ bodyRecords }) {
  if (!bodyRecords || bodyRecords.length === 0)
    return (
      <div className="bg-white p-5 rounded-xl shadow text-center text-gray-500">
        그래프를 표시할 데이터가 없습니다.
      </div>
    );

  const sorted = [...bodyRecords].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">📈 체성분 변화 추이</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sorted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#1f93ff" name="체중(kg)" />
          <Line type="monotone" dataKey="muscle" stroke="#22c55e" name="근육(kg)" />
          <Line type="monotone" dataKey="fat" stroke="#f97316" name="체지방(%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
