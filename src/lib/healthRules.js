// src/lib/healthRules.js

// metricKey: "weight" | "muscle" | "fat"
// record: { weight, muscle, fat, ... }
// profile: { age, height, sex }
// return: "high" | "normal" | "low"
export function getMetricStatus(metricKey, record, profile) {
  if (!record || !profile) return "normal";

  const { height, sex } = profile;
  const h = height ? height / 100 : null; // m 단위

  if (metricKey === "weight") {
    // BMI 기준
    // 표준 이하: BMI < 18.5
    // 표준:     18.5 ~ 24
    // 표준 이상: BMI > 24
    if (!h) return "normal";
    const bmi = record.weight / (h * h);

    if (bmi < 18.5) return "low";
    if (bmi > 24) return "high";
    return "normal";
  }

  if (metricKey === "fat") {
    // 체지방률 기준 (성별 반영)
    const v = record.fat;
    if (v == null || isNaN(v)) return "normal";

    let min, max;
    if (sex === "female") {
      // 여자: 18~28% 표준
      min = 18;
      max = 28;
    } else {
      // 남자: 10~20% 표준
      min = 10;
      max = 20;
    }

    if (v < min) return "low";
    if (v > max) return "high";
    return "normal";
  }

  if (metricKey === "muscle") {
    //근육량: 체중의 30~45%를 표준으로 가정
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
