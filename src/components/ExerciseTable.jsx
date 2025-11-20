// src/components/ExerciseTable.jsx
export default function ExerciseTable({ records, onDelete }) {
  if (!records.length)
    return (
      <div className="bg-card border border-border rounded-2xl shadow-sm p-4 text-center text-muted-foreground">
        운동 기록이 없습니다.
      </div>
    );

  const grouped = records.reduce((acc, r) => {
    if (!acc[r.date]) acc[r.date] = [];
    acc[r.date].push(r);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="mt-4 space-y-4">
      {sortedDates.map((date) => {
        const dayRecords = grouped[date];
        return (
          <div
            key={date}
            className="bg-card border border-border rounded-2xl shadow-sm p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">{date}</h3>
              <span className="text-xs text-muted-foreground">
                {dayRecords.length}개 운동
              </span>
            </div>

            <table className="w-full text-center text-sm border-t border-border">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 border border-border">운동명</th>
                  <th className="p-2 border border-border">시간(분)</th>
                  <th className="p-2 border border-border">칼로리</th>
                  <th className="p-2 border border-border">삭제</th>
                </tr>
              </thead>
              <tbody>
                {dayRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/60">
                    <td className="p-2 border border-border">{r.exercise}</td>
                    <td className="p-2 border border-border">{r.duration}</td>
                    <td className="p-2 border border-border text-emerald-600 font-semibold">
                      {r.calories}
                    </td>
                    <td className="p-2 border border-border">
                      <button
                        className="px-3 py-1 rounded bg-destructive text-destructive-foreground text-xs"
                        onClick={() => onDelete(r.id)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
