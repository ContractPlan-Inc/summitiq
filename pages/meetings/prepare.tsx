import Link from 'next/link';
import { useState } from 'react';

interface Expert {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  expertise: string[];
  experience: string;
  selected?: boolean;
}

interface MeetingContext {
  objective: string;
  customerType: string;
  industry: string;
}

export default function MeetingPrepare() {
  const [meetingContext, setMeetingContext] = useState<MeetingContext>({
    objective: '',
    customerType: '',
    industry: '',
  });

  const [selectedExperts, setSelectedExperts] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const expertLibrary: Expert[] = [
    {
      id: '1',
      name: 'Chef Marcus Chen',
      title: 'Executive Pastry Chef',
      specialty: 'Fine Dining Pastry Arts',
      avatar: '👨‍🍳',
      expertise: ['French Pastry', 'Chocolate Work', 'Plating', 'Ingredient Selection'],
      experience: '20+ years at Michelin-starred restaurants',
    },
    {
      id: '2',
      name: 'Chef Maria Rodriguez',
      title: 'Ethnic Cuisine Specialist',
      specialty: 'Latin & Asian Fusion',
      avatar: '👩‍🍳',
      expertise: ['Ethnic Ingredients', 'Fusion Cuisine', 'Authentic Flavors', 'Supply Chain'],
      experience: 'Award-winning chef, 3 successful restaurants',
    },
    {
      id: '3',
      name: 'Dr. Sarah Johnson',
      title: 'Food Science Expert',
      specialty: 'Culinary Innovation',
      avatar: '👩‍🔬',
      expertise: ['Food Chemistry', 'Ingredient Innovation', 'Texture Analysis', 'Quality Control'],
      experience: 'PhD Food Science, 15 years R&D',
    },
    {
      id: '4',
      name: 'James Patterson',
      title: 'Restaurant Operations Consultant',
      specialty: 'Cost Optimization & Menu Engineering',
      avatar: '👨‍💼',
      expertise: ['Cost Analysis', 'Menu Design', 'Supplier Relations', 'Profit Margins'],
      experience: 'Consulted 200+ restaurants',
    },
    {
      id: '5',
      name: 'Chef Giovanni Rossi',
      title: 'Italian Cuisine Master',
      specialty: 'Traditional & Modern Italian',
      avatar: '🧑‍🍳',
      expertise: ['Italian Ingredients', 'Pasta Making', 'Regional Specialties', 'Wine Pairing'],
      experience: '25 years, trained in Italy',
    },
    {
      id: '6',
      name: 'Chef Yuki Tanaka',
      title: 'Japanese Culinary Expert',
      specialty: 'Sushi & Traditional Japanese',
      avatar: '👨‍🍳',
      expertise: ['Sushi Grade Fish', 'Japanese Techniques', 'Umami', 'Presentation'],
      experience: 'Tokyo-trained, 18 years experience',
    },
  ];

  const recommendExperts = () => {
    setShowRecommendations(true);

    // AI recommendation logic based on context
    const objective = meetingContext.objective.toLowerCase();
    const recommended: string[] = [];

    if (objective.includes('pastry') || objective.includes('dessert') || objective.includes('baking')) {
      recommended.push('1'); // Pastry Chef
    }
    if (objective.includes('ethnic') || objective.includes('authentic') || objective.includes('fusion')) {
      recommended.push('2'); // Ethnic Specialist
    }
    if (objective.includes('innovation') || objective.includes('quality') || objective.includes('science')) {
      recommended.push('3'); // Food Scientist
    }
    if (objective.includes('cost') || objective.includes('profit') || objective.includes('menu')) {
      recommended.push('4'); // Operations Consultant
    }
    if (objective.includes('italian') || objective.includes('pasta')) {
      recommended.push('5'); // Italian Master
    }
    if (objective.includes('japanese') || objective.includes('sushi') || objective.includes('asian')) {
      recommended.push('6'); // Japanese Expert
    }

    // Auto-select recommended experts
    setSelectedExperts(recommended.length > 0 ? recommended : ['2', '3', '4']);
  };

  const toggleExpert = (expertId: string) => {
    setSelectedExperts(prev =>
      prev.includes(expertId)
        ? prev.filter(id => id !== expertId)
        : [...prev, expertId]
    );
  };

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
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Prepare Your Meeting</h1>
          <p className="text-gray-600">Add AI experts to your meeting for real-time guidance and recommendations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meeting Context */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-4xl">🎯</span>
                <div>
                  <h2 className="text-2xl font-bold">What's Your Sales Objective?</h2>
                  <p className="text-purple-100">Tell us about your meeting and we'll recommend the perfect experts</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Sales Objective</label>
                  <textarea
                    value={meetingContext.objective}
                    onChange={(e) => setMeetingContext({ ...meetingContext, objective: e.target.value })}
                    placeholder="e.g., I want to help the chef diversify their offerings with new specialty ethnic ingredients for authentic Asian and Latin dishes..."
                    className="w-full h-32 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Customer Type</label>
                    <select
                      value={meetingContext.customerType}
                      onChange={(e) => setMeetingContext({ ...meetingContext, customerType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="">Select type</option>
                      <option value="executive-chef">Executive Chef</option>
                      <option value="pastry-chef">Pastry Chef</option>
                      <option value="restaurant-owner">Restaurant Owner</option>
                      <option value="food-buyer">Food Service Buyer</option>
                      <option value="catering">Catering Director</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Industry</label>
                    <select
                      value={meetingContext.industry}
                      onChange={(e) => setMeetingContext({ ...meetingContext, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="">Select industry</option>
                      <option value="fine-dining">Fine Dining</option>
                      <option value="casual-dining">Casual Dining</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="catering">Catering</option>
                      <option value="food-service">Food Service</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={recommendExperts}
                  disabled={!meetingContext.objective}
                  className="w-full py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 shadow-lg"
                >
                  🤖 Get AI Expert Recommendations
                </button>
              </div>
            </div>

            {/* Expert Library */}
            {showRecommendations && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedExperts.length > 0 ? 'Recommended Experts' : 'Expert Library'}
                </h2>
                <p className="text-gray-600 mb-6">
                  Select experts to join your meeting. They'll provide real-time guidance during your call.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expertLibrary.map((expert) => {
                    const isSelected = selectedExperts.includes(expert.id);
                    const isRecommended = showRecommendations && selectedExperts.includes(expert.id);

                    return (
                      <div
                        key={expert.id}
                        onClick={() => toggleExpert(expert.id)}
                        className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 shadow-lg transform scale-105'
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                      >
                        {isRecommended && (
                          <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                            ✨ RECOMMENDED
                          </div>
                        )}

                        <div className="flex items-start space-x-4">
                          <div className="text-5xl flex-shrink-0">{expert.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{expert.name}</h3>
                            <p className="text-sm font-semibold text-blue-600 mb-2">{expert.title}</p>
                            <p className="text-xs text-gray-600 mb-3">{expert.specialty}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {expert.expertise.slice(0, 3).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">{expert.experience}</p>
                          </div>

                          {isSelected && (
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Selected Experts Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Experts</h3>

              {selectedExperts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-3">👥</div>
                  <p className="text-sm">No experts selected yet</p>
                  <p className="text-xs mt-2">Add your objective above to get recommendations</p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {expertLibrary
                    .filter((expert) => selectedExperts.includes(expert.id))
                    .map((expert) => (
                      <div
                        key={expert.id}
                        className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <span className="text-3xl">{expert.avatar}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-sm truncate">
                            {expert.name}
                          </div>
                          <div className="text-xs text-gray-600 truncate">{expert.title}</div>
                        </div>
                        <button
                          onClick={() => toggleExpert(expert.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {selectedExperts.length > 0 && (
                <>
                  <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <span className="text-2xl">🎥</span>
                      <div>
                        <div className="font-semibold">Ready for Video Call</div>
                        <div className="text-xs text-gray-600">Works with Zoom, Teams, Google Meet</div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/meetings/live"
                    className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Start Meeting with Experts
                  </Link>

                  <button className="w-full mt-3 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Save for Later
                  </button>
                </>
              )}
            </div>

            {/* Feature Highlight */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="font-bold text-gray-900 mb-2">How It Works</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>AI experts join your video call virtually</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>They listen to the conversation in real-time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Get instant suggestions, answers & recommendations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Only you see the expert panel - not your customer</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
