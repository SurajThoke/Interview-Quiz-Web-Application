import express from 'express'
import { getQuizQuestions } from '../controllers/quizController.js'

const router = express.Router()

router.get('/:domain/:level', getQuizQuestions) // GET /api/quiz/Web Development/Basic

export default router
