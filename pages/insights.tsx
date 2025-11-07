import Link from 'next/link';

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'info' | 'tip';
  category: string;
  title: string;
  description: string;
  actionable: string;
  impact: 'high' | 'medium' | 'low';
  date: string;
}

interface Pattern {
  title: string;
  description: string;
  frequency: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export default function Insights() {
  const insights: Insight[] = [
    {
      id: '1',
      type: 'success',
      category: 'Sales Technique',
      title: 'Excellent Discovery Questions',
      description: 'You\'re asking 3x more discovery questions than average, leading to better qualification.',
      actionable: 'Continue using open-ended questions to uncover pain points.',
      impact: 'high',
      date: '2 hours ago',
    },
    {
      id: '2',
      type: 'warning',
      category: 'Follow-up',
      title: 'Delayed Response Pattern Detected',
      description: 'Action items from last week\'s meetings are taking 3+ days to complete on average.',
      actionable: 'Set calendar reminders for follow-ups within 24 hours of meetings.',
      impact: 'high',
      date: '5 hours ago',
    },
    {
      id: '3',
      type: 'tip',
      category: 'Objection Handling',
      title: 'Common Objection: Budget Concerns',
      description: 'Budget objections appear in 40% of your calls. Top performers address ROI earlier.',
      actionable: 'Present ROI calculator in the first 10 minutes of discovery calls.',
      impact: 'medium',
      date: '1 day ago',
    },
    {
      id: '4',
      type: 'info',
      category: 'Competitor',
      title: 'Competitor Mentions Trending',
      description: 'CompetitorX mentioned in 3 recent calls. They\'re positioning on price.',
      actionable: 'Prepare value-based differentiation talking points.',
      impact: 'medium',
      date: '2 days ago',
    },
  ];

  const patterns: Pattern[] = [
    {
      title: 'Price Objections Decreasing',
      description: 'Your new ROI-focused approach has reduced price objections by 35%',
      frequency: 12,
      sentiment: 'positive',
    },
    {
      title: 'Decision Timeline Questions',
      description: 'You\'re asking about decision timelines in 90% of discovery calls',
      frequency: 18,
      sentiment: 'positive',
    },
    {
      title: 'Long Monologues',
      description: 'You\'re speaking for 2+ minutes without pause in 30% of meetings',
      frequency: 8,
      sentiment: 'negative',
    },
  ];

  const recommendations = [
    {
      icon: '📚',
      title: 'Recommended Training',
      items: [
        'Advanced Objection Handling Techniques',
        'Value-Based Selling Masterclass',
        'Executive Communication Skills',
      ],
    },
    {
      icon: '🎯',
      title: 'This Week\'s Focus',
      items: [
        'Reduce talk time to 35%',
        'Ask 5+ discovery questions per call',
        'Follow up within 24 hours',
      ],
    },
    {
      icon: '📊',
      title: 'Benchmark Comparison',
      items: [
        'You\'re in top 15% for listening ratio',
        'Above average in action item completion',
        'Opportunity: Improve objection handling speed',
      ],
    },
  ];

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
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI-Powered Insights</h1>
          <p className="text-gray-600">
            Personalized recommendations to help you close more deals
          </p>
        </div>

        {/* Insights Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${
                  insight.type === 'success'
                    ? 'border-green-500'
                    : insight.type === 'warning'
                    ? 'border-yellow-500'
                    : insight.type === 'tip'
                    ? 'border-blue-500'
                    : 'border-purple-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                        insight.type === 'success'
                          ? 'bg-green-100'
                          : insight.type === 'warning'
                          ? 'bg-yellow-100'
                          : insight.type === 'tip'
                          ? 'bg-blue-100'
                          : 'bg-purple-100'
                      }`}
                    >
                      {insight.type === 'success'
                        ? '✅'
                        : insight.type === 'warning'
                        ? '⚠️'
                        : insight.type === 'tip'
                        ? '💡'
                        : 'ℹ️'}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{insight.category}</div>
                      <h3 className="text-xl font-bold text-gray-900">{insight.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        insight.impact === 'high'
                          ? 'bg-red-100 text-red-700'
                          : insight.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {insight.impact} impact
                    </span>
                    <span className="text-xs text-gray-500">{insight.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{insight.description}</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    💪 Recommended Action:
                  </div>
                  <div className="text-sm text-gray-700">{insight.actionable}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Coach Summary */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-bold mb-3">AI Coach Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⭐</span>
                  <span>You\'re in the top 15% of users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📈</span>
                  <span>+23% improvement this month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🎯</span>
                  <span>3 skills to focus on this week</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl">{rec.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">{rec.title}</h3>
                </div>
                <ul className="space-y-2">
                  {rec.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Patterns Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Behavioral Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patterns.map((pattern, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-2xl ${
                      pattern.sentiment === 'positive'
                        ? '📈'
                        : pattern.sentiment === 'negative'
                        ? '📉'
                        : '➡️'
                    }`}
                  >
                    {pattern.sentiment === 'positive'
                      ? '📈'
                      : pattern.sentiment === 'negative'
                      ? '📉'
                      : '➡️'}
                  </span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                    {pattern.frequency} occurrences
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{pattern.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pattern.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
