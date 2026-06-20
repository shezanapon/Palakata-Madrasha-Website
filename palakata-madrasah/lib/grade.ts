/** Bangladesh madrasah grading (GPA-5 scale). */
export interface GradeResult {
  grade: string;
  gpa: number;
  isPassed: boolean;
}

export function gradeFromMarks(obtained: number, full: number): GradeResult {
  const pct = full > 0 ? (obtained / full) * 100 : 0;
  if (pct >= 80) return { grade: "A+", gpa: 5.0, isPassed: true };
  if (pct >= 70) return { grade: "A", gpa: 4.0, isPassed: true };
  if (pct >= 60) return { grade: "A-", gpa: 3.5, isPassed: true };
  if (pct >= 50) return { grade: "B", gpa: 3.0, isPassed: true };
  if (pct >= 40) return { grade: "C", gpa: 2.0, isPassed: true };
  if (pct >= 33) return { grade: "D", gpa: 1.0, isPassed: true };
  return { grade: "F", gpa: 0.0, isPassed: false };
}

/** Overall GPA across subjects; any fail caps the result at 0 (board rule). */
export function overallGpa(results: { gpa: number | null; isPassed: boolean }[]): number {
  if (results.length === 0) return 0;
  if (results.some((r) => !r.isPassed)) return 0;
  const sum = results.reduce((s, r) => s + (r.gpa ?? 0), 0);
  return Math.round((sum / results.length) * 100) / 100;
}
