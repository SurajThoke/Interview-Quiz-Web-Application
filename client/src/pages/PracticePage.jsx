import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PracticePage = () => {
  const navigate = useNavigate()
  const [domains, setDomains] = useState([])
  const [selectedDomain, setSelectedDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDomains()
  }, [])

  const fetchDomains = async () => {
    try {
      setLoading(true)
      setError('')
      console.log('Fetching domains from API...')
      
      const response = await fetch('/api/quiz/domains/list')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Domains received:', data)
      
      if (data && data.length > 0) {
        setDomains(data)
      } else {
        setError('No domains available')
      }
    } catch (error) {
      console.error('Failed to fetch domains:', error)
      setError(`Failed to load domains: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleStartPractice = () => {
    if (selectedDomain) {
      // For now, navigate to a placeholder page since we don't have practice quiz page yet
      alert(`Practice mode for ${selectedDomain} would start here!`)
      // navigate(`/practice-quiz/${selectedDomain}`)
    } else {
      alert('Please select a domain to practice')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Practice Mode</h1>
          <p className="text-gray-600 mb-8">Learn at your own pace with unlimited practice questions</p>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-800">{error}</p>
              <button 
                onClick={fetchDomains}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-4">How Practice Mode Works</h2>
            <ul className="text-green-700 space-y-2">
              <li>• No time limits - learn at your own pace</li>
              <li>• Instant feedback on answers</li>
              <li>• Questions from all difficulty levels</li>
              <li>• Track your progress as you go</li>
            </ul>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Choose a domain to practice:
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a domain</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            {domains.length === 0 && !loading && (
              <p className="text-red-500 mt-2">No domains available. Please check if the server is running.</p>
            )}
          </div>

          <button
            onClick={handleStartPractice}
            disabled={!selectedDomain || loading}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading Domains...' : 'Start Practicing'}
          </button>

          {/* Debug Info */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p>Domains loaded: {domains.length}</p>
            <p>Selected domain: {selectedDomain || 'None'}</p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticePage