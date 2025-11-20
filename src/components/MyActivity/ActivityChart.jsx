// src/components/MyActivity/ActivityChart.jsx
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TABS = [
  { id: "all", label: "전체" },
  { id: "weight", label: "체중" },
  { id: "muscle", label: "근육량" },
  { id: "fat", label: "체지방(%)" },
];

export default function ActivityChart({ bodyRecords }) {
  const [filter, setFilter] = useState("all");

  // 날짜 오름차순 정렬 + 그래프용 데이터 변환
  const data = useMemo(() => {
    if (!bodyRecords || bodyRecords.length === 0) return [];
    const sorted = [...bodyRecords].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sorted.map((r) => ({
      date: r.date.slice(5), // "11-20" 형식
      weight: Number(r.weight),
      muscle: Number(r.muscle),
      fat: Number(r.fat), // 이미 % 값이라고 가정
    }));
  }, [bodyRecords]);

  // Y축 최대값 계산
  const yMax = useMemo(() => {
    if (!data.length) return 0;
    const keys =
      filter === "all"
        ? ["weight", "muscle", "fat"]
        : filter === "weight"
        ? ["weight"]
        : filter === "muscle"
        ? ["muscle"]
        : ["fat"];

    let max = 0;
    for (const row of data) {
      for (const key of keys) {
        if (!isNaN(row[key])) {
          max = Math.max(max, row[key]);
        }
      }
    }
    return max || 0;
  }, [data, filter]);

  if (!data.length) {
    return (
      <section className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
        <div className="bg-white rounded-3xl border border-sky-100 px-5 py-6 text-center text-sm text-slate-500">
          체성분 기록이 아직 없어서 그래프를 표시할 수 없습니다.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 sm:px-8 sm:py-6 shadow-sm">
        {/* 상단 제목 + 탭 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            체성분 변화 추이
          </h2>
          <div className="flex gap-2 text-xs sm:text-sm">
            {TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={[
                    "px-3 py-1.5 rounded-full border transition-all",
                    active
                      ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                      : "bg-white text-sky-500 border-sky-200 hover:bg-sky-50",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 라인 차트 */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickMargin={8}
              />
              <YAxis
                domain={[0, yMax ? Math.ceil(yMax * 1.1) : "auto"]}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  fontSize: 12,
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={24}
                wrapperStyle={{ fontSize: 12 }}
              />

              {/* 근육량(kg) - 민트색 */}
              {(filter === "all" || filter === "muscle") && (
                <Line
                  type="monotone"
                  dataKey="muscle"
                  name="근육량(kg)"
                  stroke="#00C9A7"
                  strokeWidth={2.2}
                  dot={{ r: 3.5, stroke: "#00C9A7", fill: "#00C9A7" }}
                  activeDot={{ r: 5 }}
                />
              )}

              {/* 체중(kg) - 파란색 */}
              {(filter === "all" || filter === "weight") && (
                <Line
                  type="monotone"
                  dataKey="weight"
                  name="체중(kg)"
                  stroke="#00A3FF"
                  strokeWidth={2.2}
                  dot={{ r: 3.5, stroke: "#00A3FF", fill: "#00A3FF" }}
                  activeDot={{ r: 5 }}
                />
              )}

              {/* 체지방(%) - 보라색 */}
              {(filter === "all" || filter === "fat") && (
                <Line
                  type="monotone"
                  dataKey="fat"
                  name="체지방(%)"
                  stroke="#A855F7"
                  strokeWidth={2.2}
                  dot={{ r: 3.5, stroke: "#A855F7", fill: "#A855F7" }}
                  activeDot={{ r: 5 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
