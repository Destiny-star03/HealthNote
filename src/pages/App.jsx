// src/pages/App.jsx
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

import BodyForm from "../components/Bodyform";
import BodyTable from "../components/BodyTable";
import ExerciseForm from "../components/ExerciseForm";
import ExerciseTable from "../components/ExerciseTable";


export default function App() {
  const [bodyRecords, setBodyRecords] = useState([]);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [goals, setGoals] = useState({ weight: 62, muscle: 32 });

  // 🔹 수정 중인 레코드
  const [editingBody, setEditingBody] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);

  // ✅ localStorage 로드
  useEffect(() => {
    const body = JSON.parse(localStorage.getItem("bodyRecords")) || [];
    const exercise = JSON.parse(localStorage.getItem("exerciseRecords")) || [];
    const goalData =
      JSON.parse(localStorage.getItem("goals")) || { weight: 62, muscle: 32 };

    setBodyRecords(body);
    setExerciseRecords(exercise);
    setGoals(goalData);
  }, []);

  // ✅ 체성분 추가 (Create)
  const handleAddBody = (record) => {
    const updated = [...bodyRecords, record];
    setBodyRecords(updated);
    localStorage.setItem("bodyRecords", JSON.stringify(updated));
  };

  // ✅ 체성분 수정 (Update)
  const handleUpdateBody = (updatedRecord) => {
    const updated = bodyRecords.map((r) =>
      r.id === updatedRecord.id ? updatedRecord : r
    );
    setBodyRecords(updated);
    localStorage.setItem("bodyRecords", JSON.stringify(updated));
    setEditingBody(null); // 수정 종료
  };

  // ✅ 체성분 삭제 (Delete)
  const handleDeleteBody = (id) => {
    if (!confirm("해당 체성분 기록을 삭제할까요?")) return;
    const updated = bodyRecords.filter((r) => r.id !== id);
    setBodyRecords(updated);
    localStorage.setItem("bodyRecords", JSON.stringify(updated));
  };

  // ✅ 운동 추가 (Create)
  const handleAddExercise = (record) => {
    const updated = [...exerciseRecords, record];
    setExerciseRecords(updated);
    localStorage.setItem("exerciseRecords", JSON.stringify(updated));
  };

  // ✅ 운동 수정 (Update)
  const handleUpdateExercise = (updatedRecord) => {
    const updated = exerciseRecords.map((r) =>
      r.id === updatedRecord.id ? updatedRecord : r
    );
    setExerciseRecords(updated);
    localStorage.setItem("exerciseRecords", JSON.stringify(updated));
    setEditingExercise(null); // 수정 종료
  };

  // ✅ 운동 삭제 (Delete)
  const handleDeleteExercise = (id) => {
    if (!confirm("해당 운동 기록을 삭제할까요?")) return;
    const updated = exerciseRecords.filter((r) => r.id !== id);
    setExerciseRecords(updated);
    localStorage.setItem("exerciseRecords", JSON.stringify(updated));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 상단: 대시보드 */}
      <Dashboard
        bodyRecords={bodyRecords}
        exerciseRecords={exerciseRecords}
        goals={goals}
      />

      {/* 하단: 입력 & 관리 섹션 */}
      <div className="max-w-5xl mx-auto p-6 space-y-10">
        {/* ⚖️ 체성분 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            ⚖️ 체성분 기록 관리
          </h2>
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

        {/* 🏋️ 운동 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            🏋️ 운동 기록 관리
          </h2>
          <ExerciseForm
            onAddExercise={handleAddExercise}
            onUpdateExercise={handleUpdateExercise}
            editingExercise={editingExercise}
            cancelEdit={() => setEditingExercise(null)}
          />
          <ExerciseTable
            records={exerciseRecords}
            onDelete={handleDeleteExercise}
            onEdit={(record) => setEditingExercise(record)}
          />
        </section>
      </div>
    </div>
  );
}
