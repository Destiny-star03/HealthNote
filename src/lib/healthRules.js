// src/lib/healthRules.js

/**
 * metricKey: "weight" | "muscle" | "fat"
 * record: { weight, muscle, fat, ... }
 * profile: { age, height, weight }
 * return: "high" | "normal" | "low"
 */
export function getMetricStatus(metricKey, record, profile) {
  if (!record || !profile) return "normal";

  const { height } = profile;
  const h = height ? height / 100 : null; // m 단위

  if (metricKey === "weight") {
    // ✅ BMI 기준 (예시)
    // BMI = 체중(kg) / (키(m)^2)
    // 18.5 ~ 24 : 표준
    if (!h) return "normal";
    const bmi = record.weight / (h * h);
    if (bmi < 18.5) return "low";
    if (bmi > 24) return "high";
    return "normal";
  }

  if (metricKey === "fat") {
    // ✅ 체지방률 대략적 범위 (성별 없이 공통 예시)
    // 10% ~ 20%를 표준으로 가정
    const v = record.fat;
    if (v == null || isNaN(v)) return "normal";

    const min = 10;
    const max = 20;
    if (v < min) return "low";
    if (v > max) return "high";
    return "normal";
  }

  if (metricKey === "muscle") {
    // ✅ 근육량: 체중의 30~45%를 "표준"으로 가정 (예시)
    const v = record.muscle;
    const w = record.weight;
    if (v == null || w == null || isNaN(v) || isNaN(w)) return "normal";

    const min = w * 0.3;
    const max = w * 0.45;
    if (v < min) return "low";
    if (v > max) return "high";
    return "normal";
  }

  return "normal";
}
