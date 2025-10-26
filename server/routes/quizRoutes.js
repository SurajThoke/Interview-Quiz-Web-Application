import express from 'express'
import { 
  getQuizQuestions, 
  getPracticeQuestions, 
  getUserProgress, 
  getDomains, 
  getQuizStats,
  submitQuiz,
  getQuestionCounts // ADD THIS IMPORT
} from '../controllers/quizController.js'

const router = express.Router()

// Regular quiz routes
router.get('/:domain/:level', getQuizQuestions) // GET /api/quiz/Web Development/Basic

// Practice mode routes
router.get('/practice/:domain', getPracticeQuestions) // GET /api/quiz/practice/Web Development

// Progress and analytics routes
router.get('/progress/user', getUserProgress) // GET /api/quiz/progress/user
router.get('/domains/list', getDomains) // GET /api/quiz/domains/list
router.get('/stats/domains', getQuizStats) // GET /api/quiz/stats/domains

// NEW: Get question counts by domain
router.get('/counts/:domain', getQuestionCounts) // GET /api/quiz/counts/Web%20Development

// Submit quiz and update stats
router.post('/submit', submitQuiz) // POST /api/quiz/submit

export default router