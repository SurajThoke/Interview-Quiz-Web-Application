import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const QuizResult = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { score, total, domain, level } = location.state || {}

  if (score === undefined || total === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-red-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Invalid Access</h3>
          <p className="text-gray-600 mb-6">No quiz data found. Please complete a quiz first.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const percentage = Math.round((score / total) * 100)
  const correctAnswers = score
  const incorrectAnswers = total - score

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! 🎉", color: "from-purple-500 to-pink-500", emoji: "🌟" }
    if (percentage >= 80) return { message: "Excellent Work! 👍", color: "from-green-500 to-emerald-500", emoji: "🎯" }
    if (percentage >= 70) return { message: "Good Job! 👏", color: "from-blue-500 to-cyan-500", emoji: "✅" }
    if (percentage >= 60) return { message: "Not Bad! 💪", color: "from-yellow-500 to-orange-500", emoji: "📈" }
    return { message: "Keep Practicing! 📚", color: "from-red-500 to-orange-500", emoji: "🔥" }
  }

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'basic': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'medium': return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'advanced': return 'bg-gradient-to-r from-red-500 to-pink-500'
      default: return 'bg-gradient-to-r from-blue-500 to-purple-500'
    }
  }

  const performance = getPerformanceMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Result Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-8">
          {/* Header Section */}
          <div className={`bg-gradient-to-r ${performance.color} p-8 text-white text-center`}>
            <div className="text-6xl mb-4">{performance.emoji}</div>
            <h1 className="text-4xl font-bold mb-2">Quiz Completed!</h1>
            <p className="text-xl opacity-90">{performance.message}</p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Domain and Level Info */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-800">{domain}</h2>
                <span className={`inline-block mt-2 px-4 py-2 rounded-full text-white font-semibold ${getLevelColor(level)}`}>
                  {level} Level
                </span>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {score}/{total}
              </div>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${percentage * 2.513} 251.3`}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{percentage}%</div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{correctAnswers}</div>
                <div className="text-green-800 font-semibold">Correct Answers</div>
                <div className="text-green-600 text-sm mt-1">Well done!</div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{incorrectAnswers}</div>
                <div className="text-red-800 font-semibold">Incorrect Answers</div>
                <div className="text-red-600 text-sm mt-1">Learning opportunities</div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{total}</div>
                <div className="text-blue-800 font-semibold">Total Questions</div>
                <div className="text-blue-600 text-sm mt-1">Great effort!</div>
              </div>
            </div>

            {/* Performance Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Performance Tip</h4>
                  <p className="text-yellow-700">
                    {percentage >= 80 
                      ? "You're doing amazing! Consider trying more advanced levels to challenge yourself further."
                      : percentage >= 60
                      ? "Good progress! Review the questions you missed and practice similar concepts."
                      : "Don't worry! Focus on the fundamentals and take more practice quizzes to improve."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🏠 Go to Dashboard
              </button>
              
              <button
                onClick={() => navigate('/quiz-domains')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                📚 Take Another Quiz
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔄 Retry This Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Additional Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Quiz Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{percentage}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((correctAnswers / total) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{domain?.split(' ')[0]}</div>
              <div className="text-sm text-gray-600">Domain</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{level}</div>
              <div className="text-sm text-gray-600">Difficulty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizResult