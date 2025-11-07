import Link from 'next/link';
import { useState } from 'react';

interface TranscriptLine {
  id: string;
  speaker: string;
  text: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface ActionItem {
  id: string;
  text: string;
  assignee: string;
}

interface ExpertRecommendation {
  expertName: string;
  expertAvatar: string;
  message: string;
  type: 'suggestion' | 'insight' | 'answer';
  timestamp: string;
}

interface ActiveExpert {
  id: string;
  name: string;
  avatar: string;
  title: string;
  status: 'listening' | 'suggesting';
}

export default function LiveMeeting() {
  const [isRecording, setIsRecording] = useState(true);
  const [showExperts, setShowExperts] = useState(true);

  const activeExperts: ActiveExpert[] = [
    { id: '1', name: 'Chef Marcus', avatar: '👨‍🍳', title: 'Pastry Expert', status: 'suggesting' },
    { id: '2', name: 'Chef Maria', avatar: '👩‍🍳', title: 'Ethnic Specialist', status: 'listening' },
    { id: '3', name: 'Dr. Sarah', avatar: '👩‍🔬', title: 'Food Scientist', status: 'listening' },
  ];

  const transcript: TranscriptLine[] = [
    {
      id: '1',
      speaker: 'Chef David',
      text: 'I\'m interested in expanding our dessert menu with more exotic flavors. What do you have?',
      timestamp: '00:01',
      sentiment: 'positive',
    },
    {
      id: '2',
      speaker: 'You',
      text: 'We have a fantastic selection! Let me understand your vision first. What type of exotic flavors are you considering?',
      timestamp: '00:08',
      sentiment: 'positive',
    },
    {
      id: '3',
      speaker: 'Chef David',
      text: 'I\'m thinking Asian-inspired - matcha, yuzu, black sesame. But I\'m worried about consistency and authenticity.',
      timestamp: '00:15',
      sentiment: 'neutral',
    },
  ];

  const expertRecommendations: ExpertRecommendation[] = [
    {
      expertName: 'Chef Marcus',
      expertAvatar: '👨‍🍳',
      message: 'Perfect opportunity! Mention that matcha quality varies greatly. Suggest offering samples of ceremonial grade vs. culinary grade so they can taste the difference.',
      type: 'suggestion',
      timestamp: 'Just now',
    },
    {
      expertName: 'Dr. Sarah',
      expertAvatar: '👩‍🔬',
      message: 'Black sesame has unique emulsification properties. This is great for mousses and ice creams. Share technical spec sheets showing protein content.',
      type: 'insight',
      timestamp: '10s ago',
    },
    {
      expertName: 'Chef Maria',
      expertAvatar: '👩‍🍳',
      message: 'Authenticity concern is key! Mention your direct sourcing from Japan. Customers pay premium for authentic ingredients. Emphasize origin stories.',
      type: 'answer',
      timestamp: '30s ago',
    },
  ];

  const actionItems: ActionItem[] = [
    { id: '1', text: 'Send matcha quality comparison samples', assignee: 'You' },
    { id: '2', text: 'Share authenticity certificates', assignee: 'You' },
    { id: '3', text: 'Schedule tasting session', assignee: 'Chef David' },
  ];

  const meetingStats = {
    duration: '12:45',
    talkRatio: '35/65',
    sentiment: 'Very Positive',
    actionItems: 3,
    expertInsights: 8,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold">LIVE RECORDING</span>
            </div>
            <span className="text-white/80">|</span>
            <span className="font-mono">{meetingStats.duration}</span>
            <span className="text-white/80">|</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">AI Experts Active:</span>
              <div className="flex -space-x-2">
                {activeExperts.slice(0, 3).map(expert => (
                  <div key={expert.id} className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-red-600 text-xl">
                    {expert.avatar}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isRecording
                  ? 'bg-white/20 hover:bg-white/30'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isRecording ? 'Pause' : 'Resume'}
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              End Meeting
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Transcript Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Meeting Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Exotic Ingredients Discovery Call
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>👤 Chef David Martinez (Le Bernardin)</span>
                    <span>•</span>
                    <span>📅 Today, 2:00 PM</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-xl">🎥</span>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-xl">🔇</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">{meetingStats.talkRatio}</div>
                <div className="text-xs text-gray-600 mt-1">Talk Ratio</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-green-600">{meetingStats.sentiment}</div>
                <div className="text-xs text-gray-600 mt-1">Sentiment</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-purple-600">
                  {meetingStats.actionItems}
                </div>
                <div className="text-xs text-gray-600 mt-1">Actions</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-orange-600">{meetingStats.expertInsights}</div>
                <div className="text-xs text-gray-600 mt-1">Expert Tips</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">{meetingStats.duration}</div>
                <div className="text-xs text-gray-600 mt-1">Duration</div>
              </div>
            </div>

            {/* Live Transcript */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Live Transcript</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Auto-scroll</span>
                  <button className="w-10 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {transcript.map((line) => (
                  <div key={line.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {line.speaker === 'You' ? 'Y' : 'C'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">{line.speaker}</span>
                        <span className="text-xs text-gray-500">{line.timestamp}</span>
                        {line.sentiment && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              line.sentiment === 'positive'
                                ? 'bg-green-100 text-green-700'
                                : line.sentiment === 'negative'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {line.sentiment}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{line.text}</p>
                    </div>
                  </div>
                ))}
                <div className="flex space-x-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Panel Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Active Experts */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">🤖 Expert Panel</h3>
                <button
                  onClick={() => setShowExperts(!showExperts)}
                  className="text-white/80 hover:text-white"
                >
                  {showExperts ? '−' : '+'}
                </button>
              </div>
              {showExperts && (
                <div className="space-y-3">
                  {activeExperts.map((expert) => (
                    <div
                      key={expert.id}
                      className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{expert.avatar}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{expert.name}</div>
                          <div className="text-xs text-purple-100">{expert.title}</div>
                        </div>
                        {expert.status === 'suggesting' && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/meetings/prepare"
                    className="block w-full mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 text-center rounded-lg text-sm font-semibold transition-colors"
                  >
                    + Add More Experts
                  </Link>
                </div>
              )}
            </div>

            {/* Expert Recommendations Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Expert Insights</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {expertRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      rec.type === 'suggestion'
                        ? 'bg-blue-50 border-blue-500'
                        : rec.type === 'insight'
                        ? 'bg-purple-50 border-purple-500'
                        : 'bg-green-50 border-green-500'
                    }`}
                  >
                    <div className="flex items-start space-x-2 mb-2">
                      <span className="text-2xl">{rec.expertAvatar}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-900">
                          {rec.expertName}
                        </div>
                        <div className="text-xs text-gray-500">{rec.timestamp}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{rec.message}</p>
                    <div className="flex space-x-2 mt-3">
                      <button className="text-xs px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                        👍 Helpful
                      </button>
                      <button className="text-xs px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                        📋 Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">✅ Action Items</h3>
              <div className="space-y-3">
                {actionItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{item.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Assigned to: {item.assignee}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-semibold">
                + Add Action Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
