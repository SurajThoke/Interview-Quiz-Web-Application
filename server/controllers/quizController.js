import Quiz from '../models/Quiz.js'

export const getQuizQuestions = async (req, res) => {
  const { domain, level } = req.params

  try {
    const questions = await Quiz.find({ domain, level })
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quiz questions', error })
  }
}
