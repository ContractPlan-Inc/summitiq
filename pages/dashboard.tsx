import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDemoMode } from '../contexts/DemoContext';

interface Meeting {
  id: string;
  title: string;
  participant: string;
  time: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  duration?: string;
  actionItems?: number;
}

interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'meetings' | 'actions' | 'analytics'>('overview');
  const { isDemoMode, exitDemoMode } = useDemoMode();
  const router = useRouter();

  const handleExitDemo = () => {
    exitDemoMode();
    router.push('/');
  };

  const upcomingMeetings: Meeting[] = [
    {
      id: '1',
      title: 'Enterprise Deal - Q4 Review',
      participant: 'Sarah Chen (Acme Corp)',
      time: 'Today, 2:00 PM',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Product Demo',
      participant: 'Mike Johnson (TechStart)',
      time: 'Today, 4:30 PM',
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Discovery Call',
      participant: 'Lisa Martinez (Global Inc)',
      time: 'Tomorrow, 10:00 AM',
      status: 'upcoming',
    },
  ];

  const recentMeetings: Meeting[] = [
    {
      id: '4',
      title: 'Contract Negotiation',
      participant: 'David Park (Enterprise Co)',
      time: 'Yesterday, 3:00 PM',
      status: 'completed',
      duration: '45 min',
      actionItems: 5,
    },
    {
      id: '5',
      title: 'Follow-up Call',
      participant: 'Emma Wilson (StartupXYZ)',
      time: '2 days ago',
      status: 'completed',
      duration: '30 min',
      actionItems: 3,
    },
  ];

  const actionItems: ActionItem[] = [
    {
      id: '1',
      task: 'Send pricing proposal to Sarah Chen',
      assignee: 'You',
      dueDate: 'Today',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      task: 'Schedule technical deep-dive with Mike',
      assignee: 'You',
      dueDate: 'Tomorrow',
      priority: 'high',
      completed: false,
    },
    {
      id: '3',
      task: 'Follow up on contract terms with David',
      assignee: 'You',
      dueDate: 'In 2 days',
      priority: 'medium',
      completed: false,
    },
    {
      id: '4',
      task: 'Send case studies to Emma',
      assignee: 'You',
      dueDate: 'Today',
      priority: 'medium',
      completed: true,
    },
  ];

  const stats = [
    { label: 'Meetings This Week', value: '12', change: '+3', trend: 'up' },
    { label: 'Action Items Open', value: '8', change: '-2', trend: 'down' },
    { label: 'Avg Talk Time', value: '38%', change: '+5%', trend: 'up' },
    { label: 'Win Rate', value: '67%', change: '+12%', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SummitIQ
                </span>
              </Link>
              <div className="hidden md:flex space-x-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('meetings')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'meetings'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Meetings
                </button>
                <button
                  onClick={() => setActiveTab('actions')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'actions'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Actions
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'analytics'
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-2xl">🔔</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-2xl">⚙️</span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎮</span>
              <div>
                <div className="font-bold">Demo Mode Active</div>
                <div className="text-sm text-orange-100">
                  You're exploring a fully-featured demo. All data resets when you leave.
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExitDemo}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold"
              >
                Exit Demo
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-white text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-sm font-semibold"
              >
                Sign Up for Real
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isDemoMode ? 'Welcome to SummitIQ Demo!' : 'Welcome back!'}
          </h1>
          <p className="text-gray-600">
            {isDemoMode
              ? 'Exploring sample data - Try all features with this interactive demo'
              : "Here's what's happening with your meetings today"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-600 text-sm">{stat.label}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.trend === 'up'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/meetings/live" className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-3">🎙️</div>
            <div className="text-xl font-semibold mb-2">Start Live Meeting</div>
            <div className="text-blue-100 text-sm">Begin real-time transcription</div>
          </Link>
          <Link href="/meetings/prepare" className="block bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute -top-2 -right-2 px-3 py-1 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full transform rotate-12">
              NEW!
            </div>
            <div className="text-4xl mb-3">🤖</div>
            <div className="text-xl font-semibold mb-2">AI Expert Panel</div>
            <div className="text-purple-100 text-sm">Add experts to your meetings</div>
          </Link>
          <button className="bg-white text-gray-900 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-3">📅</div>
            <div className="text-xl font-semibold mb-2">Schedule Meeting</div>
            <div className="text-gray-600 text-sm">Set up your next call</div>
          </button>
          <Link href="/analytics" className="block bg-white text-gray-900 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-3">📊</div>
            <div className="text-xl font-semibold mb-2">View Analytics</div>
            <div className="text-gray-600 text-sm">Check your performance</div>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Meetings */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Meetings</h2>
              <Link href="/meetings" className="text-blue-600 hover:text-blue-700 font-semibold">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {meeting.participant.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{meeting.title}</div>
                      <div className="text-sm text-gray-600">{meeting.participant}</div>
                      <div className="text-xs text-gray-500">{meeting.time}</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items Sidebar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Action Items</h2>
            <div className="space-y-3">
              {actionItems.filter((item) => !item.completed).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.task}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{item.dueDate}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            item.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold">
              View All Action Items
            </button>
          </div>
        </div>

        {/* Recent Meetings */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Meetings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <span className="text-xs text-gray-500">{meeting.time}</span>
                </div>
                <div className="font-semibold text-gray-900 mb-1">{meeting.title}</div>
                <div className="text-sm text-gray-600 mb-3">{meeting.participant}</div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱️ {meeting.duration}</span>
                  <span>✅ {meeting.actionItems} actions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
