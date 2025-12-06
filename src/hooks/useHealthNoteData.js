// src/hooks/useHealthNoteData.js
import { useEffect, useState } from "react";

// 🔹 localStorage key 들을 한 곳에서 관리
const STORAGE_KEYS = {
  body: "bodyRecords",
  exercise: "exerciseRecords",
  goals: "goals",
  profile: "healthnote_profile",
};

const DEFAULT_GOALS = { weight: 0, muscle: 0 };

// 🔹 프로필 유효성 검사: 나이, 키, 성별이 다 채워져 있는지
function isValidProfile(profile) {
  if (!profile) return false;
  const { age, height, sex } = profile;
  return (
    age !== null &&
    age !== undefined &&
    age !== "" &&
    height !== null &&
    height !== undefined &&
    height !== "" &&
    !!sex
  );
}

export default function useHealthNoteData() {
  const [bodyRecords, setBodyRecords] = useState([]);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [goals, setGoals] = useState(DEFAULT_GOALS);

  const [editingBody, setEditingBody] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);

  // 프로필 & 모달 상태
  const [profile, setProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBodyModalOpen, setIsBodyModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  // ===== 초기 로딩 =====
  useEffect(() => {
    try {
      const body =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.body)) || [];
      const exercise =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.exercise)) || [];
      const goalData =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.goals)) ||
        DEFAULT_GOALS;

      const savedProfile = localStorage.getItem(STORAGE_KEYS.profile);
      const profileData = savedProfile ? JSON.parse(savedProfile) : null;

      setBodyRecords(body);
      setExerciseRecords(exercise);
      setGoals(goalData);
      setProfile(profileData);

      // ✅ 프로필이 없거나 값이 비어 있으면 첫 로딩 시 프로필 모달 자동 오픈
      if (!isValidProfile(profileData)) {
        setIsProfileOpen(true);
      }
    } catch (e) {
      console.error("HealthNote 초기 데이터 로딩 오류:", e);
    }
  }, []);

  // ===== 공통 업데이트 헬퍼들 =====
  const updateBodyRecords = (updateFn) => {
    setBodyRecords((prev) => {
      const next = updateFn(prev);
      localStorage.setItem(STORAGE_KEYS.body, JSON.stringify(next));
      return next;
    });
  };

  const updateExerciseRecords = (updateFn) => {
    setExerciseRecords((prev) => {
      const next = updateFn(prev);
      localStorage.setItem(STORAGE_KEYS.exercise, JSON.stringify(next));
      return next;
    });
  };

  // ===== 목표 저장 =====
  const saveGoals = (newGoals) => {
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
    localStorage.setItem(STORAGE_KEYS.goals, JSON.stringify(cleanGoals));
  };

  // ===== 프로필 저장 =====
  const saveProfile = (data) => {
    setProfile(data);
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(data));
    setIsProfileOpen(false); // 저장 후 닫기
  };

  // ===== 체성분 CRUD =====
  const addBody = (record) => {
    updateBodyRecords((prev) => [...prev, record]);
  };

  const updateBody = (updatedRecord) => {
    updateBodyRecords((prev) =>
      prev.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
    );
    setEditingBody(null);
  };

  const deleteBody = (id) => {
    if (!confirm("해당 체성분 기록을 삭제할까요?")) return;
    updateBodyRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // ===== 운동 CRUD =====
  const addExercises = (newRecords) => {
    updateExerciseRecords((prev) => [...prev, ...newRecords]);
  };

  const updateExercise = (updatedRecord) => {
    updateExerciseRecords((prev) =>
      prev.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
    );
    setEditingExercise(null); // 수정 끝나면 편집 상태 해제
  };

  const deleteExercise = (id) => {
    if (!confirm("해당 운동 기록을 삭제할까요?")) return;
    updateExerciseRecords((prev) => prev.filter((r) => r.id !== id));
    setEditingExercise((current) => current && current.id === id ? null : current);
  };

  // ===== 모달 제어 =====
  const openProfileModal = () => setIsProfileOpen(true);
  const closeProfileModal = () => setIsProfileOpen(false);

  const openBodyModal = () => setIsBodyModalOpen(true);
  const closeBodyModal = () => { setIsBodyModalOpen(false); setEditingBody(null); };

  const openExerciseModal = () => setIsExerciseModalOpen(true);
  const closeExerciseModal = () => { setIsExerciseModalOpen(false); setEditingExercise(null); };

  return {
    // 상태
    bodyRecords,
    exerciseRecords,
    goals,
    profile,
    editingBody,
    setEditingBody,
    editingExercise,
    setEditingExercise,

    // CRUD
    saveGoals,
    saveProfile,
    addBody,
    updateBody,
    deleteBody,
    addExercises,
    updateExercise,
    deleteExercise,

    // 모달 상태 & 제어
    isProfileOpen,
    isBodyModalOpen,
    isExerciseModalOpen,
    openProfileModal,
    closeProfileModal,
    openBodyModal,
    closeBodyModal,
    openExerciseModal,
    closeExerciseModal,
  };
}
