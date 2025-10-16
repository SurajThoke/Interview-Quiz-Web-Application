import React from 'react'
import { useNavigate } from 'react-router-dom'

const QuizDomains = () => {
  const navigate = useNavigate()

  const domains = [
    'Web Development',
    'Frontend (React, Angular)',
    'Backend (Node.js, Django)',
    'Full Stack',
    'Python',
    'Java',
    'C/C++',
    'Data Structures & Algorithms',
    'Database Management (SQL, MongoDB)',
    'Operating Systems',
    'Computer Networks',
    'System Design',
    'DevOps & CI/CD',
    'AI Engineering',
    'Machine Learning',
    'Data Science',
    'Cloud Computing (AWS, Azure, GCP)',
    'Cybersecurity',
    'Blockchain',
    'Mobile Development (Android/iOS)',
    'Software Testing & QA',
    'Version Control (Git/GitHub)',
    'Aptitude & Reasoning',
    'HR & Behavioral'
  ]

  const handleSelect = (domain) => {
    const encoded = encodeURIComponent(domain)
    navigate(`/quiz-levels/${encoded}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Choose a Technical Domain</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
        {domains.map((domain) => (
          <button
            key={domain}
            onClick={() => handleSelect(domain)}
            className="bg-white shadow-md px-6 py-4 rounded-lg border hover:bg-blue-50 text-center text-gray-800 hover:text-blue-600 transition duration-200 font-medium text-sm"
          >
            {domain}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizDomains
