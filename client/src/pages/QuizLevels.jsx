import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const QuizLevels = () => {
  const { domain } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [questionCounts, setQuestionCounts] = useState({
    Basic: 0,
    Medium: 0,
    Advanced: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch question counts when component mounts or domain changes
  useEffect(() => {
    const fetchQuestionCounts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Use the domain from URL params, or fallback to query parameter
        const domainName = domain || new URLSearchParams(location.search).get('domain') || 'Web Development'
        const encodedDomain = encodeURIComponent(domainName)
        
        // Mock API call - replace with your actual API endpoint
        // const response = await fetch(`/api/quiz/counts/${encodedDomain}`)
        
        // Simulate API call with timeout
        setTimeout(() => {
          // Mock data - replace with actual API response
          const mockCounts = {
            Basic: Math.floor(Math.random() * 20) + 5,
            Medium: Math.floor(Math.random() * 15) + 3,
            Advanced: Math.floor(Math.random() * 10) + 1
          }
          
          setQuestionCounts(mockCounts)
          setLoading(false)
        }, 1000)
        
      } catch (err) {
        console.error('Error fetching question counts:', err)
        setError('Failed to load question counts. Using demo data.')
        // Set fallback demo data
        setQuestionCounts({
          Basic: 15,
          Medium: 10,
          Advanced: 5
        })
        setLoading(false)
      }
    }

    fetchQuestionCounts()
  }, [domain, location.search])

  const levels = [
    {
      name: 'Basic',
      description: 'Perfect for beginners. Focus on fundamental concepts and basic syntax.',
      difficulty: 'Easy',
      color: 'from-green-500 to-emerald-500',
      icon: '🌱',
      requirements: 'No prior experience needed',
      features: ['Fundamental concepts', 'Basic syntax', 'Simple problem-solving']
    },
    {
      name: 'Medium',
      description: 'Intermediate level challenges. Test your practical knowledge and problem-solving.',
      difficulty: 'Intermediate',
      color: 'from-yellow-500 to-amber-500',
      icon: '⚡',
      requirements: 'Basic understanding required',
      features: ['Practical applications', 'Complex scenarios', 'Debugging challenges']
    },
    {
      name: 'Advanced',
      description: 'Expert-level problems. Complex scenarios and advanced concepts.',
      difficulty: 'Hard',
      color: 'from-red-500 to-orange-500',
      icon: '🚀',
      requirements: 'Strong knowledge recommended',
      features: ['Advanced concepts', 'System design', 'Performance optimization']
    }
  ]

  const handleLevelClick = (level) => {
    if (questionCounts[level.name] === 0) return
    
    const encodedLevel = encodeURIComponent(level.name)
    const domainName = domain || new URLSearchParams(location.search).get('domain') || 'Web Development'
    const encodedDomain = encodeURIComponent(domainName)
    navigate(`/quiz/${encodedDomain}/${encodedLevel}`)
  }

  const getDomainIcon = (domainName) => {
    if (!domainName) return '📚'
    
    const domainIcons = {
      'web development': '🌐',
      'frontend': '⚛️',
      'backend': '🔧',
      'python': '🐍',
      'java': '☕',
      'javascript': '📜',
      'data structures': '📊',
      'database': '🗄️',
      'system design': '🏗️',
      'devops': '🔁',
      'ai': '🤖',
      'machine learning': '🧠',
      'cloud': '☁️',
      'cybersecurity': '🔒',
      'mobile': '📱'
    }
    
    const lowerDomain = domainName.toLowerCase()
    for (const [key, icon] of Object.entries(domainIcons)) {
      if (lowerDomain.includes(key)) {
        return icon
      }
    }
    return '📚'
  }

  const getDisplayDomain = () => {
    const domainName = domain || new URLSearchParams(location.search).get('domain') || 'Web Development'
    return decodeURIComponent(domainName)
  }

  // Loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-2xl text-white">
                  {getDomainIcon(getDisplayDomain())}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {getDisplayDomain()}
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="animate-pulse bg-gray-200 h-6 w-64 rounded"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="h-2 bg-gray-200"></div>
                <div className="p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded mb-6"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <span className="text-2xl text-white">
                {getDomainIcon(getDisplayDomain())}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {getDisplayDomain()}
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your challenge level. Each difficulty offers unique questions tailored to test your skills appropriately.
          </p>
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-yellow-700 text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Levels Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {levels.map((level, index) => (
            <div
              key={level.name}
              className={`group transform transition-all duration-300 ${
                questionCounts[level.name] === 0 ? 'opacity-60' : 'cursor-pointer hover:-translate-y-2'
              }`}
            >
              <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 h-full flex flex-col ${
                questionCounts[level.name] === 0 ? '' : 'hover:shadow-2xl'
              }`}>
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${level.color}`}></div>
                
                <div className="p-6 flex-1">
                  {/* Level Icon and Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{level.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-800">{level.name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${level.color} text-white`}>
                      {level.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {level.description}
                  </p>

                  {/* Requirements */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {level.requirements}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {level.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleLevelClick(level)}
                    disabled={questionCounts[level.name] === 0}
                    className={`w-full py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
                      questionCounts[level.name] === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : `bg-gradient-to-r ${level.color} text-white hover:shadow-xl transform hover:scale-105`
                    }`}
                  >
                    {questionCounts[level.name] === 0 ? 'No Questions Available' : `Start ${level.name} Quiz`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/quiz-domains')}
            className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Domains</span>
          </button>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">What to Expect</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Instant Feedback</h4>
              <p className="text-gray-600 text-sm">Get immediate results and detailed explanations</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Timed Challenges</h4>
              <p className="text-gray-600 text-sm">Test your speed and accuracy under time pressure</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Progress Tracking</h4>
              <p className="text-gray-600 text-sm">Monitor your improvement across all difficulty levels</p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Pro Tip</h4>
              <p className="text-yellow-700 text-sm">
                Start with the Basic level to warm up, then progress to higher difficulties. 
                Each completed level unlocks valuable insights into your strengths and areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizLevels
