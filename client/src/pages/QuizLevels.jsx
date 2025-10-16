import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const QuizLevels = () => {
  const { domain } = useParams()
  const navigate = useNavigate()

  const levels = ['Basic', 'Medium', 'Advanced']

  const handleLevelClick = (level) => {
    const encodedLevel = encodeURIComponent(level)
    const encodedDomain = encodeURIComponent(domain)
    navigate(`/quiz/${encodedDomain}/${encodedLevel}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        {decodeURIComponent(domain)} Quiz
      </h2>
      <p className="text-gray-600 mb-8 text-center">Select difficulty level:</p>

      <div className="flex gap-6 flex-wrap justify-center">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => handleLevelClick(level)}
            className="bg-white border shadow-md px-8 py-4 rounded-lg hover:bg-blue-100 text-indigo-600 font-semibold text-lg transition"
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizLevels
