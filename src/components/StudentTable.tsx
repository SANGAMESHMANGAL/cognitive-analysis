'use client';

import { useState } from 'react';
import { Student } from '@/lib/data';

interface StudentTableProps {
  data: Student[];
}

export default function StudentTable({ data }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Student>('assessment_score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredData = data.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.persona.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getPersonaStyle = (persona: string) => {
    if (persona === 'High Performers') return 'bg-green-100 text-green-800';
    if (persona === 'Focused Learners') return 'bg-blue-100 text-blue-800';
    if (persona === 'Engaged Students') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search students..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('id')}>
                ID {sortField === 'id' && (sortDirection === 'asc' ? '' : '')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? '' : '')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('class')}>
                Class {sortField === 'class' && (sortDirection === 'asc' ? '' : '')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('comprehension')}>
                Comprehension {sortField === 'comprehension' && (sortDirection === 'asc' ? '' : '')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('attention')}>
                Attention {sortField === 'attention' && (sortDirection === 'asc' ? '' : '')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('focus')}>
                Focus {sortField === 'focus' && (sortDirection === 'asc' ? '' : '')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('retention')}>
                Retention {sortField === 'retention' && (sortDirection === 'asc' ? '' : '')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('assessment_score')}>
                Score {sortField === 'assessment_score' && (sortDirection === 'asc' ? '' : '')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('persona')}>
                Persona {sortField === 'persona' && (sortDirection === 'asc' ? '' : '')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.comprehension.toFixed(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.attention.toFixed(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.focus.toFixed(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.retention.toFixed(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.assessment_score.toFixed(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + getPersonaStyle(student.persona)}>
                    {student.persona}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
