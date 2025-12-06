// src/components/MyActivity/ActivityGoalPanel.jsx
import { useState } from "react";

// 공통 숫자 변환 헬퍼
const toNumberOrNull = (v) =>
  v === "" || v === null || v === undefined || isNaN(Number(v))
    ? null
    : Number(v);

export default function ActivityGoalPanel({ goals, latestBody, onSaveGoals }) {
  const [open, setOpen] = useState(false);
  const [weightInput, setWeightInput] = useState("");
  const [muscleInput, setMuscleInput] = useState("");

  // ───────────────── 현재 값 / 목표 값 숫자 변환 ─────────────────
  const currentWeight = toNumberOrNull(latestBody?.weight);
  const currentMuscle = toNumberOrNull(latestBody?.muscle);

  const goalWeight = toNumberOrNull(goals?.weight);
  const goalMuscle = toNumberOrNull(goals?.muscle);

  // ───────────────── 모달 열기/닫기 ─────────────────
  const handleOpen = () => {
    // 모달 열 때 입력창 초기값 세팅
    setWeightInput(
      goalWeight ?? currentWeight ?? "" // 우선순위: 목표 → 최근 기록 → 빈값
    );
    setMuscleInput(goalMuscle ?? currentMuscle ?? "");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // ───────────────── 저장 ─────────────────
  const handleSave = () => {
    const newGoals = {
      weight: toNumberOrNull(weightInput),
      muscle: toNumberOrNull(muscleInput),
    };

    onSaveGoals?.(newGoals);
    setOpen(false);
  };

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-5 lg:p-6 shadow-sm h-full">
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 lg:px-6 lg:py-5 shadow-sm h-full flex flex-col">
        {/* 상단 제목 + 버튼 */}
        <div className="flex items-center justify-between mb-5 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sky-500 text-2xl">🎯</span>
            <h2 className="text-lg font-semibold text-slate-800">
              목표달성률
            </h2>
          </div>
          <button
            type="button"
            onClick={handleOpen}
            className="px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-medium shadow-sm hover:bg-sky-600 transition"
          >
            변경
          </button>
        </div>

        {/* 목표 카드들 */}
        <div className="space-y-4 flex-1">
          <GoalCard
            label="목표 체중"
            current={currentWeight}
            goal={goalWeight}
            unit="kg"
            mode="down" // 감량 기준
          />
          <GoalCard
            label="목표 근육량"
            current={currentMuscle}
            goal={goalMuscle}
            unit="kg"
            mode="up" // 증량 기준
          />
        </div>
      </div>

      {/* 목표 설정 모달 */}
      {open && (
        <GoalModal
          weightInput={weightInput}
          muscleInput={muscleInput}
          setWeightInput={setWeightInput}
          setMuscleInput={setMuscleInput}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </section>
  );
}

/* --- 목표 카드 컴포넌트 --- */

function GoalCard({ label, current, goal, unit, mode }) {
  const hasCurrent = current !== null && !Number.isNaN(current);
  const hasGoal = goal !== null && !Number.isNaN(goal);

  let subtitle = "";
  let highlightClass = "text-slate-500";
  const icon = mode === "down" ? "📉" : "📈";

  if (!hasCurrent) {
    subtitle = "최근 체성분 기록이 없습니다.";
  } else if (!hasGoal) {
    subtitle = "목표가 설정되지 않았습니다.";
  } else {
    const diff = Number((current - goal).toFixed(1)); // 현재 - 목표
    const abs = Math.abs(diff).toFixed(1);

    if (diff === 0) {
      subtitle = "목표를 달성했습니다! 🎉";
      highlightClass = "text-emerald-500";
    } else if (mode === "down") {
      // 체중: 목표까지 감량 필요 / 목표보다 적게 나갈 때
      if (current > goal) {
        subtitle = `목표까지 ${abs}${unit} 감량 필요`;
        highlightClass = "text-sky-500";
      } else {
        subtitle = `목표보다 ${abs}${unit} 적습니다.`;
        highlightClass = "text-sky-500";
      }
    } else {
      // 근육: 목표까지 증량 필요 / 초과 달성
      if (current < goal) {
        subtitle = `목표까지 ${abs}${unit} 증가 필요`;
        highlightClass = "text-sky-500";
      } else {
        subtitle = `목표를 초과했습니다. 👍`;
        highlightClass = "text-emerald-500";
      }
    }
  }

  return (
    <div className="bg-sky-50 rounded-2xl px-4 py-3 lg:px-5 lg:py-4 shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-sky-600">{label}</p>
        <span className="text-sky-400 text-lg">{icon}</span>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-lg lg:text-xl font-semibold text-slate-800">
          {hasCurrent ? `${current.toFixed(1)}${unit}` : "-"}
        </span>
        <span className="text-sm text-slate-400">
          / {hasGoal ? `${goal.toFixed(1)}${unit}` : "목표 미설정"}
        </span>
      </div>

      <p className={`text-xs lg:text-sm mt-0.5 ${highlightClass}`}>
        {subtitle}
      </p>
    </div>
  );
}

/* --- 목표 입력 모달 --- */

function GoalModal({
  weightInput,
  muscleInput,
  setWeightInput,
  setMuscleInput,
  onClose,
  onSave,
}) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-30"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="목표값 설정"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          목표값 설정
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          목표 체중과 근육량을 입력하면 목표 달성률을 계산해 줍니다.
        </p>

        <div className="space-y-4 mb-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-600">목표 체중 (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm"
              placeholder="예: 70.0"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-600">목표 근육량 (kg)</label>
            <input
              type="number"
              step="0.1"
              value={muscleInput}
              onChange={(e) => setMuscleInput(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm"
              placeholder="예: 34.0"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-5 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold shadow-sm hover:bg-sky-600"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
