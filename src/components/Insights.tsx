'use client';

import { Student } from '@/lib/data';

interface InsightsProps {
  stats: {
    avgAssessment: number;
    avgComprehension: number;
    avgAttention: number;
    avgFocus: number;
    avgRetention: number;
    highPerformers: number;
    personaCounts: Record<string, number>;
  };
  data: Student[];
}

export default function Insights({ stats, data }: InsightsProps) {
  const totalStudents = data.length;
  const highPerformerPercentage = ((stats.highPerformers / totalStudents) * 100).toFixed(1);
  
  // Calculate correlations
  const comprehensionCorrelation = calculateCorrelation(
    data.map(s => s.comprehension),
    data.map(s => s.assessment_score)
  );
  
  const attentionCorrelation = calculateCorrelation(
    data.map(s => s.attention),
    data.map(s => s.assessment_score)
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Insights & Findings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
            Performance Insights
          </h4>
          <ul className="text-sm space-y-3">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2"></span>
              <span className="text-gray-700">Average assessment score: <strong className="text-gray-900">{stats.avgAssessment.toFixed(1)}</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2"></span>
              <span className="text-gray-700"><strong className="text-gray-900">{stats.highPerformers}</strong> students ({highPerformerPercentage}%) scored above 80</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2"></span>
              <span className="text-gray-700">Comprehension correlation with performance: <strong className="text-gray-900">{comprehensionCorrelation.toFixed(3)}</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2"></span>
              <span className="text-gray-700">Attention correlation with performance: <strong className="text-gray-900">{attentionCorrelation.toFixed(3)}</strong></span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            Learning Personas
          </h4>
          <ul className="text-sm space-y-3">
            {Object.entries(stats.personaCounts).map(([persona, count]) => (
              <li key={persona} className="flex items-start">
                <span className="text-green-500 mr-2"></span>
                <span className="text-gray-700">
                  <strong className="text-gray-900">{persona}</strong>: {count} students ({(count/totalStudents*100).toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
          Recommendations
        </h4>
        <ul className="text-sm space-y-3">
          <li className="flex items-start">
            <span className="text-purple-500 mr-2"></span>
            <span className="text-gray-700">Focus on comprehension and retention skills for better performance</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2"></span>
            <span className="text-gray-700">High engagement time correlates with better scores</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2"></span>
            <span className="text-gray-700">Different learning personas need tailored approaches</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2"></span>
            <span className="text-gray-700">Early intervention recommended for &apos;Developing Learners&apos; persona</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
}
