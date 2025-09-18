'use client';

import { useState, useEffect } from 'react';
import { computeOverview, generateStudents, Student } from "@/lib/data";
import { BarSkillVsScore, RadarStudentProfile, ScatterAttentionVsPerformance, PersonaDistribution } from "@/components/Charts";
import StudentTable from "@/components/StudentTable";
import Insights from "@/components/Insights";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [stats, setStats] = useState({
    avgAssessment: 0,
    avgComprehension: 0,
    avgAttention: 0,
    avgFocus: 0,
    avgRetention: 0,
    highPerformers: 0,
    personaCounts: {} as Record<string, number>
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate data on client side to avoid hydration mismatch
    const generatedStudents = generateStudents(200);
    const computedStats = computeOverview(generatedStudents);
    setStudents(generatedStudents);
    setStats(computedStats);
    setSelectedStudent(generatedStudents[0]); // Set first student as default
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Cognitive Skills & Student Performance Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Cognitive Skills & Student Performance Dashboard</h1>
        <p className="text-gray-600">Analyzing student cognitive skills and performance metrics</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-blue-500 p-4 hover:shadow-xl transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Average Assessment</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgAssessment.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 hover:shadow-xl transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Comprehension</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgComprehension.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-yellow-500 p-4 hover:shadow-xl transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Attention</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgAttention.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-purple-500 p-4 hover:shadow-xl transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Focus</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgFocus.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-red-500 p-4 hover:shadow-xl transition-shadow">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Retention</p>
          <p className="text-2xl font-bold text-gray-900">{stats.avgRetention.toFixed(1)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Score by Persona</h3>
          <BarSkillVsScore data={students} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Attention vs Performance</h3>
          <ScatterAttentionVsPerformance data={students} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Persona Distribution</h3>
          <PersonaDistribution data={students} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Student Profile (Radar)</h3>
            <select 
              value={selectedStudent?.id || ''} 
              onChange={(e) => {
                const student = students.find(s => s.id === e.target.value);
                setSelectedStudent(student || students[0]);
              }}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {students.slice(0, 20).map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.persona})
                </option>
              ))}
            </select>
          </div>
          {selectedStudent && <RadarStudentProfile student={selectedStudent} />}
        </div>
      </div>

      {/* Student table */}
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Performance Table</h3>
        <StudentTable data={students} />
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <Insights stats={stats} data={students} />
      </div>
    </div>
  );
}
