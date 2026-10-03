import { DAYS, MAX_CREDITS } from '../constants';

const toMinutes = (clock) => {
  const [hours, minutes] = clock.split(':').map(Number);
  return hours * 60 + minutes;
};

const sessionsOverlap = (a, b) =>
  a.day === b.day &&
  toMinutes(a.start) < toMinutes(b.end) &&
  toMinutes(b.start) < toMinutes(a.end);

export const coursesClash = (first, second) =>
  first.sessions.some((a) => second.sessions.some((b) => sessionsOverlap(a, b)));

export const totalCredits = (courses) =>
  courses.reduce((sum, course) => sum + course.credits, 0);

export const creditsByCategory = (courses) =>
  courses.reduce((totals, course) => {
    totals[course.category] = (totals[course.category] || 0) + course.credits;
    return totals;
  }, {});

export const addState = (course, planned) => {
  if (planned.some((p) => p.id === course.id)) return { kind: 'added' };
  const rival = planned.find((p) => coursesClash(p, course));
  if (rival) return { kind: 'clash', detail: `Clashes with ${rival.code}` };
  if (totalCredits(planned) + course.credits > MAX_CREDITS) {
    return { kind: 'limit', detail: `Would pass the ${MAX_CREDITS} credit limit` };
  }
  return { kind: 'ok' };
};

export const weekView = (courses) =>
  DAYS.map((day) => ({
    day,
    entries: courses
      .flatMap((course) =>
        course.sessions
          .filter((s) => s.day === day)
          .map((s) => ({ course, start: s.start, end: s.end }))
      )
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start)),
  }));

export const formatSessions = (course) =>
  course.sessions.map((s) => `${s.day} ${s.start}-${s.end}`).join('  |  ');
