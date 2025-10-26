import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import QuizDomains from './pages/QuizDomains'
import QuizLevels from './pages/QuizLevels'
import QuizPage from './pages/QuizPage'
import QuizResult from './pages/QuizResult'
import PracticePage from './pages/PracticePage' // Add this import
import ProgressPage from './pages/ProgressPage' // Add this import
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz-domains"
          element={
            <ProtectedRoute>
              <QuizDomains />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz-levels/:domain"
          element={
            <ProtectedRoute>
              <QuizLevels />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:domain/:level"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz-result"
          element={
            <ProtectedRoute>
              <QuizResult />
            </ProtectedRoute>
          }
        />

        {/* Updated Practice Route */}
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <PracticePage />
            </ProtectedRoute>
          }
        />

        {/* Updated Progress Route */}
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App