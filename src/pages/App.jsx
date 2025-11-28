// src/pages/App.jsx
import Dashboard from "./Dashboard";
import ProfilePage from "../components/modals/ProfileModal.jsx";
import BodyRecordModal from "../components/modals/BodyRecordModal.jsx";
import ExerciseRecordModal from "../components/modals/ExerciseRecordModal";
import useHealthNoteData from "../hooks/useHealthNoteData";

export default function App() {
  // localStorage.clear();
  const {
    // ===== 상태 =====
    bodyRecords,
    exerciseRecords,
    goals,
    profile,
    editingBody,
    setEditingBody,

    // ===== CRUD =====
    saveGoals,
    saveProfile,
    addBody,
    updateBody,
    deleteBody,
    addExercises,
    deleteExercise,

    // ===== 모달 상태 & 컨트롤 =====
    isProfileOpen,
    isBodyModalOpen,
    isExerciseModalOpen,
    openProfileModal,
    closeProfileModal,
    openBodyModal,
    closeBodyModal,
    openExerciseModal,
    closeExerciseModal,
  } = useHealthNoteData();

  return (
    
    <div className="min-h-screen bg-background text-foreground">
      {/* 상단 헤더 */}
      <Header onOpenProfile={openProfileModal} />

      {/* 메인 대시보드 */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        <Dashboard
          bodyRecords={bodyRecords}
          exerciseRecords={exerciseRecords}
          goals={goals}
          onSaveGoals={saveGoals}
          profile={profile}
          onOpenBodyModal={openBodyModal}
          onOpenExerciseModal={openExerciseModal}
        />
      </main>

      {/* 체성분 기록 관리 모달 */}
      {isBodyModalOpen && (
        <BodyRecordModal
          bodyRecords={bodyRecords}
          onAddBody={addBody}
          onUpdateBody={updateBody}
          onDeleteBody={deleteBody}
          editingBody={editingBody}
          setEditingBody={setEditingBody}
          onClose={closeBodyModal}
        />
      )}

      {/* 운동 기록 관리 모달 */}
      {isExerciseModalOpen && (
        <ExerciseRecordModal
          exerciseRecords={exerciseRecords}
          onAddExercises={addExercises}
          onDeleteExercise={deleteExercise}
          onClose={closeExerciseModal}
        />
      )}

      {/* 프로필 모달 */}
      {isProfileOpen && (
        <ProfilePage
          initialProfile={profile}
          onClose={closeProfileModal}
          onSave={saveProfile}
        />
      )}
    </div>
  );
}

/** 상단 헤더를 분리해서 역할을 더 명확하게 */
function Header({ onOpenProfile }) {
  return (
    <header className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          <span className="text-primary font-bold">HealthNote</span>
          <span className="ml-2 text-sm text-muted-foreground">
            · 나의 활동 대시보드
          </span>
        </h1>

        <button
          type="button"
          onClick={onOpenProfile}
          className="flex flex-col items-center justify-center text-xs text-sky-500 hover:text-sky-600"
        >
          <ProfileIcon />
          <span className="mt-0.5 font-medium">프로필</span>
        </button>
      </div>
    </header>
  );
}

/** 사람 아이콘 그대로 유지 */
function ProfileIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0ea5e9"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2C6.6 16.7 9.1 15 12 15s5.4 1.7 6.5 4.2" />
    </svg>
  );
}
