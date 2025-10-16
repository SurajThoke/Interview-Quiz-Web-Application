import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const QuizResult = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { score, total, domain, level } = location.state || {}

  if (score === undefined || total === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-600">
        Invalid Access. No Quiz Data Found.
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">🎉 Quiz Completed!</h2>
        <p className="text-lg text-gray-700 mb-2">Domain: <strong>{domain}</strong></p>
        <p className="text-lg text-gray-700 mb-2">Level: <strong>{level}</strong></p>
        <p className="text-xl mt-4 text-green-600 font-semibold">Score: {score} / {total}</p>

        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default QuizResult
