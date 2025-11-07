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

interface AIInsight {
  type: 'suggestion' | 'warning' | 'info';
  message: string;
}

export default function LiveMeeting() {
  const [isRecording, setIsRecording] = useState(true);
  const [showAICoach, setShowAICoach] = useState(true);

  const transcript: TranscriptLine[] = [
    {
      id: '1',
      speaker: 'Sarah Chen',
      text: 'Thanks for taking the time to meet with us today. I wanted to discuss the enterprise plan.',
      timestamp: '00:01',
      sentiment: 'positive',
    },
    {
      id: '2',
      speaker: 'You',
      text: 'Absolutely! I\'m excited to learn more about your needs. Can you tell me about your current challenges?',
      timestamp: '00:08',
      sentiment: 'positive',
    },
    {
      id: '3',
      speaker: 'Sarah Chen',
      text: 'We\'re struggling with follow-up consistency. Action items get lost after meetings.',
      timestamp: '00:15',
      sentiment: 'negative',
    },
    {
      id: '4',
      speaker: 'You',
      text: 'That\'s exactly what SummitIQ solves. Our AI automatically captures and tracks every action item.',
      timestamp: '00:22',
      sentiment: 'positive',
    },
  ];

  const actionItems: ActionItem[] = [
    { id: '1', text: 'Send enterprise pricing details', assignee: 'You' },
    { id: '2', text: 'Schedule technical demo', assignee: 'Sarah' },
    { id: '3', text: 'Share case studies', assignee: 'You' },
  ];

  const aiInsights: AIInsight[] = [
    {
      type: 'suggestion',
      message: 'Great! You\'re listening 62% of the time. Keep it up!',
    },
    {
      type: 'info',
      message: 'Sarah mentioned "struggling" - this is a pain point opportunity',
    },
    {
      type: 'suggestion',
      message: 'Consider asking about budget and decision timeline',
    },
  ];

  const meetingStats = {
    duration: '23:45',
    talkRatio: '38/62',
    sentiment: 'Positive',
    actionItems: 3,
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
                    Enterprise Deal - Q4 Review
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>👤 Sarah Chen (Acme Corp)</span>
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
            <div className="grid grid-cols-4 gap-4">
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
                <div className="text-xs text-gray-600 mt-1">Action Items</div>
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
                        {line.speaker === 'You' ? 'Y' : 'S'}
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

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Coach Panel */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">AI Coach</h3>
                <button
                  onClick={() => setShowAICoach(!showAICoach)}
                  className="text-white/80 hover:text-white"
                >
                  {showAICoach ? '−' : '+'}
                </button>
              </div>
              {showAICoach && (
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20"
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-lg">
                          {insight.type === 'suggestion'
                            ? '💡'
                            : insight.type === 'warning'
                            ? '⚠️'
                            : 'ℹ️'}
                        </span>
                        <p className="text-sm leading-relaxed">{insight.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Action Items</h3>
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

            {/* Quick Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Notes</h3>
              <textarea
                className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                placeholder="Add your notes here..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
