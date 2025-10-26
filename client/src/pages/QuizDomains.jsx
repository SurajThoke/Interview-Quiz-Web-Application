import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QuizDomains = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const domains = [
    { name: 'Web Development', category: 'web', icon: '🌐' },
    { name: 'Frontend (React, Angular)', category: 'frontend', icon: '⚛️' },
    { name: 'Backend (Node.js, Django)', category: 'backend', icon: '🔧' },
    { name: 'Full Stack', category: 'fullstack', icon: '🚀' },
    { name: 'Python', category: 'programming', icon: '🐍' },
    { name: 'Java', category: 'programming', icon: '☕' },
    { name: 'C/C++', category: 'programming', icon: '⚡' },
    { name: 'Data Structures & Algorithms', category: 'cs-fundamentals', icon: '📊' },
    { name: 'Database Management (SQL, MongoDB)', category: 'database', icon: '🗄️' },
    { name: 'Operating Systems', category: 'cs-fundamentals', icon: '💻' },
    { name: 'Computer Networks', category: 'cs-fundamentals', icon: '🌐' },
    { name: 'System Design', category: 'architecture', icon: '🏗️' },
    { name: 'DevOps & CI/CD', category: 'devops', icon: '🔁' },
    { name: 'AI Engineering', category: 'ai-ml', icon: '🤖' },
    { name: 'Machine Learning', category: 'ai-ml', icon: '🧠' },
    { name: 'Data Science', category: 'data', icon: '📈' },
    { name: 'Cloud Computing (AWS, Azure, GCP)', category: 'cloud', icon: '☁️' },
    { name: 'Cybersecurity', category: 'security', icon: '🔒' },
    { name: 'Blockchain', category: 'emerging', icon: '⛓️' },
    { name: 'Mobile Development (Android/iOS)', category: 'mobile', icon: '📱' },
    { name: 'Software Testing & QA', category: 'testing', icon: '🧪' },
    { name: 'Version Control (Git/GitHub)', category: 'tools', icon: '📚' },
    { name: 'Aptitude & Reasoning', category: 'aptitude', icon: '🎯' },
    { name: 'HR & Behavioral', category: 'behavioral', icon: '💼' }
  ]

  const categories = [
    { id: 'all', name: 'All Domains', count: domains.length },
    { id: 'web', name: 'Web Development', count: domains.filter(d => d.category === 'web').length },
    { id: 'frontend', name: 'Frontend', count: domains.filter(d => d.category === 'frontend').length },
    { id: 'backend', name: 'Backend', count: domains.filter(d => d.category === 'backend').length },
    { id: 'programming', name: 'Programming', count: domains.filter(d => d.category === 'programming').length },
    { id: 'cs-fundamentals', name: 'CS Fundamentals', count: domains.filter(d => d.category === 'cs-fundamentals').length },
    { id: 'ai-ml', name: 'AI & ML', count: domains.filter(d => d.category === 'ai-ml').length },
    { id: 'cloud', name: 'Cloud', count: domains.filter(d => d.category === 'cloud').length }
  ]

  const handleSelect = (domain) => {
    const encoded = encodeURIComponent(domain.name)
    navigate(`/quiz-levels/${encoded}`)
  }

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || domain.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category) => {
    const colors = {
      web: 'from-blue-500 to-cyan-500',
      frontend: 'from-purple-500 to-pink-500',
      backend: 'from-green-500 to-emerald-500',
      programming: 'from-orange-500 to-red-500',
      'cs-fundamentals': 'from-indigo-500 to-blue-500',
      database: 'from-yellow-500 to-orange-500',
      architecture: 'from-teal-500 to-green-500',
      devops: 'from-gray-500 to-blue-500',
      'ai-ml': 'from-purple-500 to-indigo-500',
      data: 'from-pink-500 to-rose-500',
      cloud: 'from-sky-500 to-blue-500',
      security: 'from-red-500 to-orange-500',
      emerging: 'from-green-500 to-teal-500',
      mobile: 'from-blue-500 to-indigo-500',
      testing: 'from-yellow-500 to-amber-500',
      tools: 'from-gray-500 to-slate-500',
      aptitude: 'from-cyan-500 to-blue-500',
      behavioral: 'from-emerald-500 to-green-500',
      fullstack: 'from-purple-500 to-blue-500'
    }
    return colors[category] || 'from-gray-500 to-slate-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              CodeDrill
            </h1>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Choose Your Domain</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a technical domain to test your skills and level up your expertise
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search domains..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredDomains.map((domain) => (
            <div
              key={domain.name}
              onClick={() => handleSelect(domain)}
              className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${getCategoryColor(domain.category)}`}></div>
                
                <div className="p-6 flex-1">
                  {/* Icon and Title */}
                  <div className="flex items-start space-x-3 mb-6">
                    <div className="text-2xl flex-shrink-0">{domain.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200 leading-tight">
                      {domain.name}
                    </h3>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-indigo-600 hover:text-white transition-all duration-200 group-hover:shadow-lg transform group-hover:scale-105">
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDomains.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No domains found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">{domains.length}</div>
              <div className="text-sm text-gray-600">Total Domains</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {domains.length * 3}
              </div>
              <div className="text-sm text-gray-600">Difficulty Levels</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                1000+
              </div>
              <div className="text-sm text-gray-600">Questions Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizDomains