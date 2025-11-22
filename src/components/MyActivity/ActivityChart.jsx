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
import { getMetricStatus } from "../../lib/healthRules";

// ───────────────────────────
// 상수 & 헬퍼
// ───────────────────────────
const METRICS = {
  weight: { key: "weight", label: "체중 (kg)", unit: "kg" },
  muscle: { key: "muscle", label: "골격근량 (kg)", unit: "kg" },
  fat: { key: "fat", label: "체지방률 (%)", unit: "%" },
};

const formatNumber = (value, digits = 1) => {
  if (value === null || value === undefined || isNaN(value)) return "-";
  return Number(value).toFixed(digits);
};

const getStatusLabel = (status) => {
  if (status === "high") return "표준 이상";
  if (status === "low") return "표준 이하";
  return "표준";
};

const getStatusColorClass = (status) => {
  if (status === "high") return "bg-red-500";
  if (status === "low") return "bg-slate-400";
  return "bg-emerald-500";
};

// 문자열 / %가 섞여 있어도 안전하게 숫자로 변환
const parseMetricValue = (raw, metricKey) => {
  if (raw === null || raw === undefined) return NaN;
  let s = String(raw).trim();
  // "20.2%" 같은 경우 처리
  if (metricKey === "fat" && s.endsWith("%")) {
    s = s.slice(0, -1);
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
};

// Y축 도메인 계산 (이상치 방어)
const calcDomain = (data, metricKey) => {
  const allValues = data
    .map((d) => parseMetricValue(d[metricKey], metricKey))
    .filter((v) => !Number.isNaN(v));

  if (allValues.length === 0) return { minY: 0, maxY: 10 };

  let values = allValues;

  if (metricKey === "fat") {
    // 체지방률: 0~60% 사이 값만 도메인 계산에 사용
    const filtered = allValues.filter((v) => v >= 0 && v <= 60);
    if (filtered.length > 0) {
      values = filtered;
    }
  }

  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);

  const padding = metricKey === "fat" ? 2 : 3;

  let minY = Math.max(0, rawMin - padding);
  let maxY = rawMax + padding;

  // 체지방률은 최종 도메인을 0~60 사이로 강제
  if (metricKey === "fat") {
    minY = 0;
    maxY = Math.min(Math.max(maxY, 10), 60);
  }

  // min == max 인 경우 살짝 벌려주기 (축가 99999999 비슷하게 이상해지는 것 방지)
  if (minY === maxY) {
    minY = Math.max(0, minY - 1);
    maxY = maxY + 1;
  }

  return { minY, maxY };
};

// ───────────────────────────
// 메인 컴포넌트
// ───────────────────────────
export default function ActivityChart({ bodyRecords, profile }) {
  const hasData = Array.isArray(bodyRecords) && bodyRecords.length > 0;

  const sortedData = useMemo(
    () =>
      hasData
        ? [...bodyRecords].sort((a, b) => (a.date > b.date ? 1 : -1))
        : [],
    [bodyRecords, hasData]
  );

  const latestRecord = sortedData[sortedData.length - 1] ?? null;

  const [activeRecord, setActiveRecord] = useState(latestRecord);
  const [selectedMetric, setSelectedMetric] = useState("weight");

  useEffect(() => {
    setActiveRecord(latestRecord);
  }, [latestRecord]);

  const currentRecord = activeRecord ?? latestRecord;
  const metric = METRICS[selectedMetric];
  const activeValue = currentRecord ? currentRecord[metric.key] : null;

  // 선택된 metric 기준 Y축 범위
  const { minY, maxY } = useMemo(
    () => calcDomain(sortedData, metric.key),
    [sortedData, metric.key]
  );

  // 표준/이상/이하 상태
  const weightStatus =
    profile && currentRecord
      ? getMetricStatus("weight", currentRecord, profile)
      : "normal";

  const muscleStatus =
    profile && currentRecord
      ? getMetricStatus("muscle", currentRecord, profile)
      : "normal";

  const fatStatus =
    profile && currentRecord
      ? getMetricStatus("fat", currentRecord, profile)
      : "normal";

  if (!hasData || !latestRecord) {
    return (
      <section className="w-full bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm text-center text-sm text-slate-500">
        아직 체성분 기록이 없습니다. 아래에서 기록을 추가하면 그래프가 나타납니다.
      </section>
    );
  }

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

  return (
    <section className="chart-container w-full bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
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

        {/* 상단 3개 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <MetricCard
            label="체중 (kg)"
            value={formatNumber(currentRecord?.weight, 1)}
            active={selectedMetric === "weight"}
            status={weightStatus}
            onClick={() => setSelectedMetric("weight")}
          />
          <MetricCard
            label="골격근량 (kg)"
            value={formatNumber(currentRecord?.muscle, 1)}
            active={selectedMetric === "muscle"}
            status={muscleStatus}
            onClick={() => setSelectedMetric("muscle")}
          />
          <MetricCard
            label="체지방률 (%)"
            value={formatNumber(currentRecord?.fat, 1)}
            active={selectedMetric === "fat"}
            status={fatStatus}
            onClick={() => setSelectedMetric("fat")}
          />
        </div>

        {/* 라인 차트 */}
        <div className="w-full h-64 sm:h-72 min-w-0">
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
                domain={[minY, maxY]}
                tick={{ fontSize: 11, fill: "#6B7280" }}
                tickMargin={8}
                tickFormatter={(v) =>
                  Number.isFinite(v) ? v.toFixed(1) : v
                }
              />
              <Tooltip
                formatter={(value) =>
                  `${formatNumber(value, 1)}${metric.unit}`
                }
                labelFormatter={(label) => `날짜: ${label}`}
              />

              {currentRecord && (
                <ReferenceLine
                  x={currentRecord.date}
                  stroke="#9CA3AF"
                  strokeDasharray="4 4"
                />
              )}

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

/** 인바디 스타일 상단 카드 */
function MetricCard({ label, value, active, status = "normal", onClick }) {
  const statusLabel = getStatusLabel(status);
  const statusColorClass = getStatusColorClass(status);

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
          statusColorClass
        }
      >
        <span className="text-[11px] font-semibold text-white">
          {statusLabel}
        </span>
      </div>
    </button>
  );
}
