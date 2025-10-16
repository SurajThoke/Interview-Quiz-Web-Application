import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleStartQuiz = () => {
    navigate('/quiz-domains')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to CodeDrill 🎯</h1>
      <p className="text-gray-700 mb-8 text-center">You're now logged in. Start preparing for your interviews!</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleStartQuiz}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Start Quiz
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
