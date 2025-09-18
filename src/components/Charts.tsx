'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Student } from '@/lib/data';

interface BarSkillVsScoreProps {
  data: Student[];
}

export function BarSkillVsScore({ data }: BarSkillVsScoreProps) {
  const personaData = data.reduce((acc, student) => {
    if (!acc[student.persona]) {
      acc[student.persona] = { persona: student.persona, count: 0, totalScore: 0 };
    }
    acc[student.persona].count++;
    acc[student.persona].totalScore += student.assessment_score;
    return acc;
  }, {} as Record<string, { persona: string; count: number; totalScore: number }>);

  const chartData = Object.values(personaData).map(item => ({
    persona: item.persona,
    avgScore: item.totalScore / item.count
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="persona" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#F9FAFB', 
            border: '1px solid #E5E7EB',
            borderRadius: '8px'
          }} 
        />
        <Bar dataKey="avgScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface ScatterAttentionVsPerformanceProps {
  data: Student[];
}

export function ScatterAttentionVsPerformance({ data }: ScatterAttentionVsPerformanceProps) {
  const scatterData = data.map(student => ({
    attention: student.attention,
    score: student.assessment_score,
    persona: student.persona,
    color: getPersonaColor(student.persona)
  }));

  function getPersonaColor(persona: string) {
    switch (persona) {
      case 'High Performers': return '#10B981';
      case 'Focused Learners': return '#3B82F6';
      case 'Engaged Students': return '#F59E0B';
      case 'Developing Learners': return '#EF4444';
      default: return '#6B7280';
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart data={scatterData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="attention" 
          name="Attention" 
          tick={{ fontSize: 12 }}
          label={{ value: 'Attention Score', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          dataKey="score" 
          name="Score" 
          tick={{ fontSize: 12 }}
          label={{ value: 'Assessment Score', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{ 
            backgroundColor: '#F9FAFB', 
            border: '1px solid #E5E7EB',
            borderRadius: '8px'
          }}
        />
        <Scatter 
          dataKey="score" 
          fill="#3B82F6"
          r={6}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

interface RadarStudentProfileProps {
  student: Student;
}

export function RadarStudentProfile({ student }: RadarStudentProfileProps) {
  const radarData = [
    { skill: 'Comprehension', value: student.comprehension },
    { skill: 'Attention', value: student.attention },
    { skill: 'Focus', value: student.focus },
    { skill: 'Retention', value: student.retention }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis tick={{ fontSize: 10 }} />
        <Radar 
          name="Skills" 
          dataKey="value" 
          stroke="#8B5CF6" 
          fill="#8B5CF6" 
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

interface PersonaDistributionProps {
  data: Student[];
}

export function PersonaDistribution({ data }: PersonaDistributionProps) {
  const personaCounts = data.reduce((acc, student) => {
    acc[student.persona] = (acc[student.persona] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(personaCounts).map(([name, value]) => ({
    name,
    value,
    fill: getPersonaColor(name)
  }));

  function getPersonaColor(persona: string) {
    switch (persona) {
      case 'High Performers': return '#10B981';
      case 'Focused Learners': return '#3B82F6';
      case 'Engaged Students': return '#F59E0B';
      case 'Developing Learners': return '#EF4444';
      default: return '#6B7280';
    }
  }

  // Custom label function to handle small slices better
  const renderCustomLabel = (props: any) => {
    const percent: number = typeof props?.percent === 'number' ? props.percent : 0;
    const name: string = typeof props?.name === 'string' ? props.name : '';
    if (percent < 0.05) {
      return null;
    }
    return name + ' ' + (percent * 100).toFixed(0) + '%';
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={'cell-' + index} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#F9FAFB', 
            border: '1px solid #E5E7EB',
            borderRadius: '8px'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, entry) => (
            <span style={{ color: entry.color, fontSize: '12px' }}>
              {value} ({((entry.payload.value / data.length) * 100).toFixed(1)}%)
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
