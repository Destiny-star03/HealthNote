// src/components/MyActivity/ActivityChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useMemo, useState, useEffect } from "react";

const METRICS = {
  weight: { key: "weight", label: "체중 (kg)", unit: "kg" },
  muscle: { key: "muscle", label: "골격근량 (kg)", unit: "kg" },
  fat: { key: "fat", label: "체지방률 (%)", unit: "%" },
};

export default function ActivityChart({ bodyRecords }) {
  if (!bodyRecords || bodyRecords.length === 0) {
    return (
      <section className="w-full bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm text-center text-sm text-slate-500">
        아직 체성분 기록이 없습니다. 아래에서 기록을 추가하면 그래프가 나타납니다.
      </section>
    );
  }

  // 날짜순 정렬
  const sortedData = useMemo(
    () => [...bodyRecords].sort((a, b) => (a.date > b.date ? 1 : -1)),
    [bodyRecords]
  );

  const latestRecord = sortedData[sortedData.length - 1];

  // 그래프에서 선택된 지점 (기본: 가장 최근 값)
  const [activeRecord, setActiveRecord] = useState(latestRecord);

  // 어떤 항목의 그래프를 볼지 (체중 / 근육량 / 체지방률)
  const [selectedMetric, setSelectedMetric] = useState("weight");

  useEffect(() => {
    setActiveRecord(latestRecord);
  }, [latestRecord]);

  const formatNumber = (value, digits = 1) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return Number(value).toFixed(digits);
  };

  // 🔹 지금 화면에 보여줄 기준 레코드
  //    - 기본: 가장 최근 값
  //    - 그래프/날짜 클릭 후: activeRecord
  const currentRecord = activeRecord ?? latestRecord;

  // 🔹 그래프 영역 클릭 시: 점 또는 해당 날짜 라인을 클릭하면 그 날짜 데이터 선택
  const handleChartClick = (state) => {
    if (!state) return;

    const payload = state.activePayload?.[0]?.payload;
    const label = state.activeLabel;

    let record = null;

    if (payload) {
      record = payload;
    } else if (label != null) {
      record = sortedData.find((d) => d.date === label) ?? null;
    }

    if (record) {
      setActiveRecord(record);
    }
  };

  const metric = METRICS[selectedMetric];
  const activeValue = currentRecord ? currentRecord[metric.key] : null;

  // 🔹 선택된 metric 기준으로 Y축 최소/최대값 계산
  const { minY, maxY } = useMemo(() => {
    const key = metric.key;

    const values = sortedData
      .map((d) => Number(d[key]))
      .filter((v) => !isNaN(v));

    if (values.length === 0) {
      return { minY: 0, maxY: 10 }; // 안전한 기본값
    }

    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);

    const padding = 3; // 여유값

    // 최소값은 0 아래로 내려가지 않게 (특히 체지방률 %)
    const minY = Math.max(0, rawMin - padding);
    const maxY = rawMax + padding;

    return { minY, maxY };
  }, [sortedData, metric]);

  return (
    <section className="w-full bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
      <div className="bg-white rounded-3xl border border-sky-100 px-4 sm:px-6 py-4 sm:py-5 shadow-sm">
        {/* 제목 + 선택된 측정값 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            체성분 변화 추이
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 text-right">
            선택된 측정:{" "}
            <span className="font-medium text-sky-600">
              {currentRecord?.date ?? "-"}
            </span>
            {currentRecord && (
              <>
                {"  •  "}
                <span className="font-semibold text-slate-800">
                  {formatNumber(activeValue, 1)}
                  {metric.unit}
                </span>
              </>
            )}
          </p>
        </div>

        {/* 🔹 카드 3개: 클릭도 가능 + 숫자는 currentRecord 기준으로 변경 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <MetricCard
            label="체중 (kg)"
            value={formatNumber(currentRecord?.weight, 1)}
            unit="kg"
            active={selectedMetric === "weight"}
            onClick={() => setSelectedMetric("weight")}
          />
          <MetricCard
            label="골격근량 (kg)"
            value={formatNumber(currentRecord?.muscle, 1)}
            unit="kg"
            active={selectedMetric === "muscle"}
            onClick={() => setSelectedMetric("muscle")}
          />
          <MetricCard
            label="체지방률 (%)"
            value={formatNumber(currentRecord?.fat, 1)}
            unit="%"
            active={selectedMetric === "fat"}
            onClick={() => setSelectedMetric("fat")}
          />
        </div>

        {/* 🔹 라인 차트 */}
        <div className="w-full h-64 sm:h-72 chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sortedData}
              margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
              onClick={handleChartClick}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                tickMargin={8}

              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                tickMargin={8}
                domain={[minY, maxY]} // ⬅️ 최소/최대 적용
              />
              <Tooltip
                formatter={(value) =>
                  `${formatNumber(value, 1)}${metric.unit}`
                }
                labelFormatter={(label) => `날짜: ${label}`}
              />

              {/* 선택된 날짜 기준 세로 점선 */}
              {currentRecord && (
                <ReferenceLine
                  x={currentRecord.date}
                  stroke="#9CA3AF"
                  strokeDasharray="4 4"
                />
              )}

              {/* 인바디 느낌: 연한 회색 라인 + 초록 점 */}
              <Line
                type="monotone"
                dataKey={metric.key}
                stroke="#D4D4D8"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#22C55E",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#16A34A",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

/** InBody 스타일 상단 카드 (클릭 가능) */
function MetricCard({ label, value, unit, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex flex-col justify-between rounded-3xl px-5 py-4 shadow-sm border transition " +
        (active
          ? "bg-white border-emerald-500 ring-2 ring-emerald-200"
          : "bg-slate-50 border-slate-200 hover:border-emerald-400")
      }
    >
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 tracking-tight">
        {value}
      </p>
      <div
        className={
          "mt-3 inline-flex items-center justify-center rounded-full px-3 py-1 " +
          (active ? "bg-emerald-500" : "bg-emerald-500/90")
        }
      >
        <span className="text-[11px] font-semibold text-white">표준</span>
      </div>
    </button>
  );
}
