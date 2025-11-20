// src/components/ProfilePage.jsx
import { useState } from "react";

export default function ProfilePage({ initialProfile, onClose, onSave }) {
    const [form, setForm] = useState({
        age: initialProfile?.age || "",
        height: initialProfile?.height || "",
        weight: initialProfile?.weight || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.age || !form.height || !form.weight) {
            alert("나이, 키, 몸무게를 모두 입력해 주세요.");
            return;
        }
        onSave({
            age: Number(form.age),
            height: Number(form.height),
            weight: Number(form.weight),
        });
    };

    return (
        // 🔹 오버레이: 훨씬 더 밝게 + 살짝 블러
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm">
            {/* 바깥 클릭 시 닫기 */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative z-10 w-full max-w-md mx-4">
               <div className="rounded-3xl border border-black/40 shadow-xl bg-sky-50/80 backdrop-blur-md p-6">

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <ProfileIconSmall />
                            <h2 className="text-base font-semibold text-slate-800">
                                프로필 정보
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            ✕
                        </button>
                    </div>

                    <p className="text-xs text-muted-foreground mb-4">
                        나이 · 키 · 몸무게를 저장해 두면, 상단 인바디 카드에서{" "}
                        <span className="font-semibold text-emerald-500">
                            표준/이상/이하
                        </span>
                        를 계산하는 데 사용할 수 있어요.
                    </p>

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
                                placeholder="예: 169.7"
                            />
                        </div>

                        {/* 몸무게 */}
                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-slate-700">몸무게 (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={form.weight}
                                onChange={handleChange}
                                className="rounded-xl border border-border px-3 py-2 bg-white shadow-inner
                           focus:outline-none focus:ring-2 focus:ring-sky-300"
                                placeholder="예: 64"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-full text-xs font-medium
                           text-slate-500 bg-slate-100/90 hover:bg-slate-200"
                            >
                                취소
                            </button>
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
