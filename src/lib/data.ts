export interface Student {
  id: string;
  name: string;
  class: string;
  comprehension: number;
  attention: number;
  focus: number;
  retention: number;
  assessment_score: number;
  engagement_time: number;
  persona: string;
}

// Seeded random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

export function generateStudents(count: number): Student[] {
  const students: Student[] = [];
  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Sam', 'Blake', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Benjamin'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
  
  // Use a fixed seed for consistent results
  const rng = new SeededRandom(12345);
  
  for (let i = 0; i < count; i++) {
    const baseAbility = rng.next() * 60 + 20;
    const comprehension = Math.min(100, Math.max(20, baseAbility + (rng.next() - 0.5) * 20));
    const attention = Math.min(100, Math.max(15, comprehension * 0.7 + rng.next() * 30));
    const focus = Math.min(100, Math.max(10, attention * 0.8 + rng.next() * 20));
    const retention = Math.min(100, Math.max(20, (comprehension * 0.6 + focus * 0.4) + (rng.next() - 0.5) * 20));
    const assessment_score = Math.min(100, Math.max(30, (comprehension * 0.3 + attention * 0.2 + focus * 0.2 + retention * 0.3) + (rng.next() - 0.5) * 10));
    const engagement_time = Math.min(120, Math.max(10, (focus * 0.4 + attention * 0.3) * 0.8 + rng.next() * 30));
    
    let persona = 'Developing Learners';
    if (assessment_score > 85) persona = 'High Performers';
    else if (focus > 80 && attention > 75) persona = 'Focused Learners';
    else if (engagement_time > 80) persona = 'Engaged Students';
    
    students.push({
      id: 'STU' + String(i + 1).padStart(4, '0'),
      name: firstNames[Math.floor(rng.next() * firstNames.length)] + ' ' + lastNames[Math.floor(rng.next() * lastNames.length)],
      class: 'Grade ' + (Math.floor(rng.next() * 4) + 9),
      comprehension: Math.round(comprehension * 10) / 10,
      attention: Math.round(attention * 10) / 10,
      focus: Math.round(focus * 10) / 10,
      retention: Math.round(retention * 10) / 10,
      assessment_score: Math.round(assessment_score * 10) / 10,
      engagement_time: Math.round(engagement_time * 10) / 10,
      persona
    });
  }
  
  return students;
}

export function computeOverview(students: Student[]) {
  const total = students.length;
  if (total === 0) return {
    avgAssessment: 0,
    avgComprehension: 0,
    avgAttention: 0,
    avgFocus: 0,
    avgRetention: 0,
    highPerformers: 0,
    personaCounts: {}
  };
  
  const avgAssessment = students.reduce((sum, s) => sum + s.assessment_score, 0) / total;
  const avgComprehension = students.reduce((sum, s) => sum + s.comprehension, 0) / total;
  const avgAttention = students.reduce((sum, s) => sum + s.attention, 0) / total;
  const avgFocus = students.reduce((sum, s) => sum + s.focus, 0) / total;
  const avgRetention = students.reduce((sum, s) => sum + s.retention, 0) / total;
  const highPerformers = students.filter(s => s.assessment_score > 80).length;
  
  const personaCounts = students.reduce((acc, s) => {
    acc[s.persona] = (acc[s.persona] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    avgAssessment,
    avgComprehension,
    avgAttention,
    avgFocus,
    avgRetention,
    highPerformers,
    personaCounts
  };
}
