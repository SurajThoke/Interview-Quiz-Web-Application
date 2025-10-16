import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  level: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true }
})

const Quiz = mongoose.model('Quiz', quizSchema)
export default Quiz
