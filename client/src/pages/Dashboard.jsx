import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [userStats, setUserStats] = useState({
    quizzesCompleted: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    streak: 0,
    successRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/quiz/progress/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUserStats({
          quizzesCompleted: data.quizzesCompleted || 0,
          correctAnswers: data.correctAnswers || 0,
          totalQuestions: data.totalQuestions || 0,
          streak: data.streak || 0,
          successRate: data.successRate || 0
        })
      } else {
        console.error('Failed to fetch user progress')
      }
    } catch (error) {
      console.error('Error fetching user progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleStartQuiz = () => {
    navigate('/quiz-domains')
  }

  const handleViewProgress = () => {
    navigate('/progress')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              CodeDrill
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>

        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome back! 🚀
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to crush some code challenges? Your journey to mastery continues here!
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-center text-white shadow-lg">
                <div className="text-2xl font-bold">{userStats.quizzesCompleted}</div>
                <div className="text-sm opacity-90">Quizzes Done</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-center text-white shadow-lg">
                <div className="text-2xl font-bold">{userStats.correctAnswers}</div>
                <div className="text-sm opacity-90">Correct Answers</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-center text-white shadow-lg">
                <div className="text-2xl font-bold">{userStats.successRate}%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-center text-white shadow-lg">
                <div className="text-2xl font-bold">{userStats.streak} {userStats.streak > 0 ? '🔥' : ''}</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards - Only Full Quiz Library and Progress Analytics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Full Quiz Library */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Full Quiz Library</h3>
            <p className="text-gray-600 mb-4">Explore our complete collection of quizzes across all domains and difficulty levels</p>
            <button
              onClick={handleStartQuiz}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Browse All Quizzes
            </button>
          </div>

          {/* Progress Analytics */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Progress Analytics</h3>
            <p className="text-gray-600 mb-4">Track your learning journey with detailed insights and performance metrics</p>
            <button
              onClick={handleViewProgress}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
              View Detailed Analytics
            </button>
          </div>
        </div>

        {/* Quick Stats & Achievements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {userStats.quizzesCompleted > 0 ? (
                <>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Completed Quiz</p>
                      <p className="text-sm text-gray-600">You finished a quiz with {userStats.successRate}% accuracy</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Learning Streak</p>
                      <p className="text-sm text-gray-600">{userStats.streak} days in a row! Keep it up! 🔥</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No recent activity yet</p>
                  <p className="text-sm text-gray-400">Complete your first quiz to see your activity here!</p>
                </div>
              )}
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Coming Soon ✨</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-20 rounded-lg">
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Competitive Leaderboard</p>
                  <p className="text-sm opacity-90">Compete with developers worldwide</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-20 rounded-lg">
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Skill Badges</p>
                  <p className="text-sm opacity-90">Earn badges for your achievements</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-20 rounded-lg">
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Community Challenges</p>
                  <p className="text-sm opacity-90">Team up and solve problems together</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg">
          <p className="text-lg font-medium mb-2">"The expert in anything was once a beginner."</p>
          <p className="text-indigo-200">Keep practicing, keep growing! 🌟</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
