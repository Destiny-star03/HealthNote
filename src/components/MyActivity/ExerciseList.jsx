// src/components/MyActivity/ExerciseList.jsx
import { useMemo, useState, useEffect, useRef } from "react";

export default function ActivityExerciseList({
  exercises = [],
  onOpenRecordModal,
}) {
  const hasExercises = exercises.length > 0;

  // 1️⃣ 날짜 목록 (중복 제거 + 최신 날짜 순 정렬)
  const sortedDates = useMemo(() => {
    if (!hasExercises) return [];
    const uniqueDates = Array.from(new Set(exercises.map((e) => e.date)));
    return uniqueDates.sort((a, b) => new Date(b) - new Date(a));
  }, [exercises, hasExercises]);

  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState("");

  // 날짜 목록이 변경되면 자동으로 최신 날짜 선택
  useEffect(() => {
    if (sortedDates.length > 0) {
      setSelectedDate(sortedDates[0]);
    } else {
      setSelectedDate("");
    }
  }, [sortedDates]);

  // 2️⃣ 선택된 날짜의 운동만 필터링
  const dailyExercises = useMemo(() => {
    if (!selectedDate) return [];
    return exercises.filter((e) => e.date === selectedDate);
  }, [exercises, selectedDate]);

  const hasDailyExercises = dailyExercises.length > 0;
  const showEmptyAll = !hasExercises;
  const showEmptyForDate = hasExercises && !hasDailyExercises;
  const showList = hasDailyExercises;

  return (
    <section className="bg-sky-50 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-sm">
      <div className="bg-white rounded-3xl border border-sky-100 px-5 py-4 sm:px-8 sm:py-6 shadow-sm">
        {/* 상단 타이틀 + 날짜 선택 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            최근 운동기록
          </h2>

          {hasExercises && (
            <DateDropdown
              dates={sortedDates}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          )}
        </div>

        {/* 전체 데이터가 없을 때 */}
        {showEmptyAll && (
          <div className="text-center text-sm text-slate-500 py-6">
            아직 운동 기록이 없습니다. 아래에서 운동을 기록해 보세요.
          </div>
        )}

        {/* 선택한 날짜에 운동이 없을 때 */}
        {showEmptyForDate && (
          <div className="text-center text-sm text-slate-500 py-6">
            선택한 날짜({selectedDate})에는 운동 기록이 없습니다.
          </div>
        )}

        {/* 선택된 날짜의 운동 리스트 */}
        {showList && (
          <ul className="space-y-3">
            {dailyExercises.map((ex) => (
              <li
                key={ex.id}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-sky-50 rounded-2xl shadow-inner"
              >
                {/* 왼쪽: 운동 정보 */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sky-500 text-lg">🏋️</span>
                    <span className="font-semibold text-slate-800 text-sm sm:text-base">
                      {ex.exercise}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="text-sky-500 text-sm">⏱️</span>
                      {ex.duration}분
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-orange-400 text-sm">🔥</span>
                      {ex.calories}kcal
                    </span>
                  </div>
                </div>

                {/* 오른쪽: 날짜 */}
                <div className="flex items-center gap-1 text-xs sm:text-sm text-sky-500">
                  <span className="text-base">📅</span>
                  <span className="font-medium">{ex.date}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* 항상 보이는 '운동 기록 관리' 버튼 */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onOpenRecordModal}
            className="px-4 py-2 text-xs sm:text-sm rounded-full bg-sky-500 text-white font-medium shadow hover:bg-sky-600 active:scale-[0.98] transition"
          >
            운동 기록 관리
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- 날짜 드롭다운 분리 컴포넌트 ---------- */

function DateDropdown({ dates, selectedDate, onSelectDate }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!dates || dates.length === 0) return null;

  const handleToggle = () => setOpen((prev) => !prev);

  const handleSelect = (date) => {
    onSelectDate(date);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative text-xs sm:text-sm"
    >
      <span className="mr-2 text-slate-500">날짜 선택</span>

      {/* 드롭다운 버튼 */}
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex items-center justify-between px-3 py-1.5 rounded-full border ${
          open ? "border-sky-400" : "border-sky-300"
        } bg-white text-sky-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition min-w-[120px]`}
      >
        <span className="mr-2">
          {selectedDate || (dates.length > 0 ? dates[0] : "")}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 text-sky-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 펼쳐지는 리스트 */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl border border-sky-100 shadow-lg py-1 z-20">
          {dates.map((d) => {
            const active = d === selectedDate;
            return (
              <button
                key={d}
                type="button"
                onClick={() => handleSelect(d)}
                className={`w-full text-left px-3 py-2 text-xs ${
                  active
                    ? "bg-sky-50 text-sky-600 font-semibold"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
