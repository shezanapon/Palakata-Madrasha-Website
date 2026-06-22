"use server";

import { revalidatePath } from "next/cache";
import type { ClassLevel, Term } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getActor, STAFF_ROLES } from "@/lib/auth-helpers";
import { gradeFromMarks } from "@/lib/grade";

export interface ActionState {
  ok?: boolean;
  error?: string;
  message?: string;
}

export interface ResultEntry {
  studentId: string;
  obtained: number | null;
}

export interface SaveResultsInput {
  classLevel: string;
  section?: string;
  term: string;
  year: number;
  subject: string;
  fullMarks: number;
  entries: ResultEntry[];
}

export async function saveResults(input: SaveResultsInput): Promise<ActionState> {
  const actor = await getActor(STAFF_ROLES);
  if (!actor) return { error: "Not authorized." };

  const { classLevel, section, term, year, subject, fullMarks, entries } = input;
  if (!classLevel || !term || !year || !subject) return { error: "Missing class / term / year / subject." };
  if (!fullMarks || fullMarks <= 0) return { error: "Full marks must be greater than 0." };

  const valid = entries.filter((e) => e.obtained !== null && !Number.isNaN(e.obtained));
  if (valid.length === 0) return { error: "Enter at least one mark." };

  try {
    const ids = valid.map((e) => e.studentId);
    // Replace any previous marks for these students/subject/term/year.
    await prisma.result.deleteMany({
      where: { studentId: { in: ids }, term: term as Term, year, subject },
    });
    await prisma.result.createMany({
      data: valid.map((e) => {
        const g = gradeFromMarks(e.obtained as number, fullMarks);
        return {
          studentId: e.studentId,
          classLevel: classLevel as ClassLevel,
          section: section || null,
          term: term as Term,
          year,
          subject,
          fullMarks,
          obtainedMarks: e.obtained,
          grade: g.grade,
          gpa: g.gpa,
          isPassed: g.isPassed,
        };
      }),
    });

    revalidatePath("/dashboard/results");
    return { ok: true, message: `Saved ${valid.length} result(s) for ${subject}.` };
  } catch {
    return { error: "Could not save. Is the database connected?" };
  }
}
