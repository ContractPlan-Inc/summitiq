import Link from 'next/link';
import { useState } from 'react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

export default function Analytics() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  const metrics: MetricCard[] = [
    {
      title: 'Total Meetings',
      value: '47',
      change: '+12%',
      trend: 'up',
      icon: '📊',
    },
    {
      title: 'Avg Talk Time',
      value: '38%',
      change: '+5%',
      trend: 'up',
      icon: '🎙️',
    },
    {
      title: 'Win Rate',
      value: '67%',
      change: '+15%',
      trend: 'up',
      icon: '🎯',
    },
    {
      title: 'Action Completion',
      value: '89%',
      change: '+8%',
      trend: 'up',
      icon: '✅',
    },
  ];

  const topPerformingMeetings = [
    { title: 'Enterprise Discovery', score: 95, sentiment: 'Very Positive', date: '3 days ago' },
    { title: 'Product Demo', score: 92, sentiment: 'Positive', date: '1 week ago' },
    { title: 'Contract Review', score: 88, sentiment: 'Positive', date: '2 weeks ago' },
  ];

  const improvementAreas = [
    { area: 'Asking Discovery Questions', current: 72, target: 85, priority: 'high' },
    { area: 'Objection Handling', current: 68, target: 80, priority: 'high' },
    { area: 'Product Knowledge', current: 91, target: 95, priority: 'medium' },
    { area: 'Active Listening', current: 88, target: 90, priority: 'low' },
  ];

  const weeklyActivity = [
    { day: 'Mon', meetings: 8, duration: 360 },
    { day: 'Tue', meetings: 12, duration: 480 },
    { day: 'Wed', meetings: 10, duration: 420 },
    { day: 'Thu', meetings: 15, duration: 540 },
    { day: 'Fri', meetings: 11, duration: 450 },
  ];

  const maxMeetings = Math.max(...weeklyActivity.map((d) => d.meetings));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SummitIQ
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
          <p className="text-gray-600">Track your meeting performance and improve your sales skills</p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-4 py-2 rounded-md transition-all ${
                timeframe === 'week'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-4 py-2 rounded-md transition-all ${
                timeframe === 'month'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeframe('quarter')}
              className={`px-4 py-2 rounded-md transition-all ${
                timeframe === 'quarter'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              This Quarter
            </button>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Export Report
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{metric.icon}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    metric.trend === 'up'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
            <div className="space-y-4">
              {weeklyActivity.map((day) => (
                <div key={day.day}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{day.day}</span>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{day.meetings} meetings</span>
                      <span>{Math.floor(day.duration / 60)}h {day.duration % 60}m</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold transition-all duration-500"
                      style={{ width: `${(day.meetings / maxMeetings) * 100}%` }}
                    >
                      {day.meetings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Talk Time Ratio */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Talk Time Ratio</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <svg className="transform -rotate-90" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="502"
                    strokeDashoffset="312"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-gray-900">38%</div>
                  <div className="text-sm text-gray-600">You</div>
                </div>
              </div>
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">You talking</span>
                  </span>
                  <span className="font-semibold">38%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-700">Customer talking</span>
                  </span>
                  <span className="font-semibold">62%</span>
                </div>
              </div>
              <div className="mt-6 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm text-center">
                ✓ Excellent listening ratio!
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Meetings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Meetings</h2>
            <div className="space-y-4">
              {topPerformingMeetings.map((meeting, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{meeting.title}</div>
                      <div className="text-sm text-gray-600">{meeting.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{meeting.score}</div>
                    <div className="text-xs text-gray-600">{meeting.sentiment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Areas */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Improvement Areas</h2>
            <div className="space-y-4">
              {improvementAreas.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{item.area}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : item.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.current}% / {item.target}%
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.current}%` }}
                    ></div>
                    <div
                      className="absolute top-0 h-full w-0.5 bg-green-500"
                      style={{ left: `${item.target}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
