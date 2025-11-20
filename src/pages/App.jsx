// src/pages/App.jsx
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

import BodyForm from "../components/BodyForm";
import BodyTable from "../components/BodyTable";
import ExerciseForm from "../components/ExerciseForm";
import ExerciseTable from "../components/ExerciseTable";

export default function App() {
  const [bodyRecords, setBodyRecords] = useState([]);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [goals, setGoals] = useState({ weight: 62, muscle: 32 });

  const [editingBody, setEditingBody] = useState(null);

  const handleSaveGoals = (newGoals) => {
    const cleanGoals = {
      weight:
        newGoals.weight !== undefined && newGoals.weight !== null
          ? Number(newGoals.weight)
          : null,
      muscle:
        newGoals.muscle !== undefined && newGoals.muscle !== null
          ? Number(newGoals.muscle)
          : null,
    };

    setGoals(cleanGoals);
    localStorage.setItem("goals", JSON.stringify(cleanGoals));
  };

  useEffect(() => {
    const body = JSON.parse(localStorage.getItem("bodyRecords")) || [];
    const exercise =
      JSON.parse(localStorage.getItem("exerciseRecords")) || [];
    const goalData =
      JSON.parse(localStorage.getItem("goals")) || { weight: 62, muscle: 32 };

    setBodyRecords(body);
    setExerciseRecords(exercise);
    setGoals(goalData);
  }, []);

  // 체성분 CRUD
  const handleAddBody = (record) => {
    const updated = [...bodyRecords, record];
    setBodyRecords(updated);
    localStorage.setItem("bodyRecords", JSON.stringify(updated));
  };

  const handleUpdateBody = (updatedRecord) => {
    const updated = bodyRecords.map((r) =>
      r.id === updatedRecord.id ? updatedRecord : r
    );
    setBodyRecords(updated);
    localStorage.setItem("bodyRecords", JSON.stringify(updated));
    setEditingBody(null);
  };

  const handleDeleteBody = (id) => {
    if (!confirm("해당 체성분 기록을 삭제할까요?")) return;
    const updated = bodyRecords.filter((r) => r.id !== id);
    setBodyRecords(updated);
    localStorage.setItem("bodyRecords", JSON.stringify(updated));
  };

  // 운동 CRUD (여러 개 한 번에 추가)
  const handleAddExercises = (newRecords) => {
    const updated = [...exerciseRecords, ...newRecords];
    setExerciseRecords(updated);
    localStorage.setItem("exerciseRecords", JSON.stringify(updated));
  };

  const handleDeleteExercise = (id) => {
    if (!confirm("해당 운동 기록을 삭제할까요?")) return;
    const updated = exerciseRecords.filter((r) => r.id !== id);
    setExerciseRecords(updated);
    localStorage.setItem("exerciseRecords", JSON.stringify(updated));
  };

  return (


    <div className="min-h-screen bg-background text-foreground">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            <span className="text-primary font-bold">HealthNote</span>
            <span className="ml-2 text-sm text-muted-foreground">
              · 나의 활동 대시보드
            </span>
          </h1>
          <span className="text-xs text-muted-foreground">
            React + Tailwind Theme
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        {/* 0. 상단 “나의 활동” 대시보드 */}
        <Dashboard
          bodyRecords={bodyRecords}
          exerciseRecords={exerciseRecords}
          goals={goals}
          onSaveGoals={handleSaveGoals}
        />


        {/* 1. 체성분 기록 관리 */}
        <section className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">⚖️ 체성분 기록 관리</h2>
              <p className="text-xs text-muted-foreground mt-1">
                날짜별로 하루 한 번만 기록되며, 기본값은 오늘 날짜입니다.
                필요하면 과거 날짜도 선택해서 기록할 수 있어요.
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs text-primary">
              저장 · 수정 · 삭제
            </span>
          </div>

          <BodyForm
            bodyRecords={bodyRecords}
            onAddBody={handleAddBody}
            onUpdateBody={handleUpdateBody}
            editingBody={editingBody}
            cancelEdit={() => setEditingBody(null)}
          />

          <BodyTable
            records={bodyRecords}
            onDelete={handleDeleteBody}
            onEdit={(record) => setEditingBody(record)}
          />
        </section>

        {/* 2. 운동 기록 관리 */}
        <section className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-5 space-y-4 pb-10">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">🏋️ 운동 기록 관리</h2>
              <p className="text-xs text-muted-foreground mt-1">
                기록 날짜를 기준으로 여러 운동을 한 번에 추가하고, 날짜별로 묶어서
                관리합니다.
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs text-primary">
              여러 종목 동시 기록
            </span>
          </div>

          <ExerciseForm onAddExercises={handleAddExercises} />

          <ExerciseTable records={exerciseRecords} onDelete={handleDeleteExercise} />
        </section>
      </main>
    </div>
  );
}
