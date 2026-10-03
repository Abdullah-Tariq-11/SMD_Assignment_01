const session = (day, start, end) => ({ day, start, end });

export const catalog = [
  {
    id: 'cs301',
    code: 'CS-301',
    title: 'Operating Systems',
    credits: 3,
    category: 'Core',
    sessions: [session('Mon', '09:00', '10:30'), session('Wed', '09:00', '10:30')],
  },
  {
    id: 'cs302',
    code: 'CS-302',
    title: 'Operating Systems Lab',
    credits: 1,
    category: 'Lab',
    sessions: [session('Thu', '14:00', '17:00')],
  },
  {
    id: 'cs320',
    code: 'CS-320',
    title: 'Database Systems',
    credits: 3,
    category: 'Core',
    sessions: [session('Tue', '10:30', '12:00'), session('Thu', '10:30', '12:00')],
  },
  {
    id: 'cs321',
    code: 'CS-321',
    title: 'Database Systems Lab',
    credits: 1,
    category: 'Lab',
    sessions: [session('Fri', '09:00', '12:00')],
  },
  {
    id: 'cs340',
    code: 'CS-340',
    title: 'Mobile App Development',
    credits: 3,
    category: 'Elective',
    sessions: [session('Mon', '10:30', '12:00'), session('Wed', '10:30', '12:00')],
  },
  {
    id: 'cs345',
    code: 'CS-345',
    title: 'Computer Networks',
    credits: 3,
    category: 'Core',
    sessions: [session('Tue', '09:00', '10:30'), session('Thu', '09:00', '10:30')],
  },
  {
    id: 'cs360',
    code: 'CS-360',
    title: 'Artificial Intelligence',
    credits: 3,
    category: 'Elective',
    sessions: [session('Mon', '13:00', '14:30'), session('Wed', '13:00', '14:30')],
  },
  {
    id: 'mt301',
    code: 'MT-301',
    title: 'Probability and Statistics',
    credits: 3,
    category: 'Math',
    sessions: [session('Tue', '13:00', '14:30'), session('Thu', '13:00', '14:30')],
  },
  {
    id: 'mt310',
    code: 'MT-310',
    title: 'Linear Algebra',
    credits: 3,
    category: 'Math',
    sessions: [session('Mon', '09:30', '11:00'), session('Wed', '09:30', '11:00')],
  },
  {
    id: 'hu210',
    code: 'HU-210',
    title: 'Technical Writing',
    credits: 2,
    category: 'General',
    sessions: [session('Fri', '13:00', '15:00')],
  },
  {
    id: 'se350',
    code: 'SE-350',
    title: 'Software Quality Assurance',
    credits: 3,
    category: 'Core',
    sessions: [session('Tue', '14:30', '16:00'), session('Thu', '14:30', '16:00')],
  },
  {
    id: 'se360',
    code: 'SE-360',
    title: 'Cloud Computing',
    credits: 3,
    category: 'Elective',
    sessions: [session('Mon', '15:00', '16:30'), session('Wed', '15:00', '16:30')],
  },
];

export const categories = ['Core', 'Elective', 'Math', 'Lab', 'General'];

export const termHistory = [
  { term: 'F22', sgpa: 2.85, credits: 16 },
  { term: 'S23', sgpa: 3.05, credits: 17 },
  { term: 'F23', sgpa: 3.2, credits: 18 },
  { term: 'S24', sgpa: 3.1, credits: 17 },
  { term: 'F24', sgpa: 3.45, credits: 18 },
  { term: 'S25', sgpa: 3.6, credits: 17 },
  { term: 'F25', sgpa: 3.55, credits: 16 },
];

export const initialPlan = ['cs301', 'cs320'];
