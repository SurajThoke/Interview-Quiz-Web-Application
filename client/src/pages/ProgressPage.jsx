import React, { useState, useEffect } from 'react'

const ProgressPage = () => {
  const [progressData, setProgressData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/quiz/progress/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setProgressData(data)
    } catch (error) {
      console.error('Failed to fetch progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading your progress...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Learning Progress</h1>
          <p className="text-gray-600 mb-8">Track your journey and see how far you've come</p>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{progressData?.quizzesCompleted || 0}</div>
              <div className="text-sm text-blue-800">Quizzes Done</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
              <div className="text-2xl font-bold text-green-600">{progressData?.correctAnswers || 0}</div>
              <div className="text-sm text-green-800">Correct Answers</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">
                {progressData ? Math.round((progressData.correctAnswers / progressData.totalQuestions) * 100) : 0}%
              </div>
              <div className="text-sm text-purple-800">Success Rate</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
              <div className="text-2xl font-bold text-orange-600">{progressData?.streak || 0} 🔥</div>
              <div className="text-sm text-orange-800">Day Streak</div>
            </div>
          </div>

          {/* Domain-wise Progress */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Domain Progress</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {progressData?.domains && Object.entries(progressData.domains).map(([domain, stats]) => (
                <div key={domain} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 capitalize">{domain}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold">{stats.completed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Correct Answers:</span>
                      <span className="font-semibold text-green-600">{stats.correct}/{stats.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {progressData?.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <span className="font-semibold text-gray-800 capitalize">{activity.domain}</span>
                    <span className="text-gray-600 ml-2">on {activity.date}</span>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {activity.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage