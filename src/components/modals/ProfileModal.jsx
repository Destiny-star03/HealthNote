// src/components/common/ProfileModal.jsx
import { useState, useEffect } from "react";

function createInitialForm(initialProfile) {
  return {
    age: initialProfile?.age ?? "",
    height: initialProfile?.height ?? "",
    sex: initialProfile?.sex ?? "male", // "male" | "female"
  };
}

export default function ProfilePage({ initialProfile, onClose, onSave }) {
  const [form, setForm] = useState(() => createInitialForm(initialProfile));

  // 프로필 값이 바뀌면 모달 폼도 동기화
  useEffect(() => {
    setForm(createInitialForm(initialProfile));
  }, [initialProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { age, height, sex } = form;

    if (!age || !height || !sex) {
      alert("나이, 키, 성별을 모두 입력해 주세요.");
      return;
    }

    onSave({
      age: Number(age),
      height: Number(height),
      sex,
    });
  };

  // 오버레이 클릭 시 모달 닫기 (내용 클릭은 무시)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const checkOnclose = () =>  {
    const { age, height, sex } = form;

    if (!age || !height || !sex) {
      alert("나이, 키, 성별을 모두 입력해 주세요.");
      return;
    }
    onClose();
  }

  return (
    // 🔹 오버레이: 밝게 + 살짝 블러
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm"
    >
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* 🔹 카드: 파스텔 하늘색 + 검은 테두리 + 반투명 */}
        <div className="rounded-3xl border border-black/40 shadow-xl bg-sky-50/80 backdrop-blur-md p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ProfileIconSmall />
              <h2 className="text-base font-semibold text-slate-800">
                프로필 정보
              </h2>
            </div>
            <button
              type="button"
              onClick={checkOnclose}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-muted-foreground mb-4">
            나이 · 키 · 성별을 저장해 두면, 상단 인바디 카드에서{" "}
            <span className="font-semibold text-emerald-500">
              표준/이상/이하
            </span>
            를 계산하는 데 사용할 수 있어요.
          </p>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            {/* 나이 */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-slate-700">나이</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="rounded-xl border border-border px-3 py-2 bg-white shadow-inner
                           focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="예: 23"
                min={0}
              />
            </div>

            {/* 키 */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-slate-700">키 (cm)</label>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                className="rounded-xl border border-border px-3 py-2 bg-white shadow-inner
                           focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="예:175"
                min={0}
                step="0.1"
              />
            </div>

            {/* 성별 */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-slate-700">성별</label>
              <select
                name="sex"
                value={form.sex}
                onChange={handleChange}
                className="rounded-xl border border-border px-3 py-2 bg-white
                           focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option value="male">남</option>
                <option value="female">여</option>
              </select>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-full text-xs font-medium
                           bg-sky-500 text-white hover:bg-sky-600"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ProfileIconSmall() {
  return (
    <svg
      className="w-5 h-5"
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
