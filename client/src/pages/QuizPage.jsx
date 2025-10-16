import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const quizData = {
  webdevelopment: {
    basic: [
      {
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language',
          'Hyper Trainer Marking Language',
        ],
        answer: 'Hyper Text Markup Language',
      },
      {
        question: 'Which tag is used to link a CSS file in HTML?',
        options: ['<style>', '<css>', '<link>', '<script>'],
        answer: '<link>',
      },
    ],
  },
};

const QuizPage = () => {
  const { domain, level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const normalizedDomain = domain.toLowerCase().replace(/\s+/g, '');
    const normalizedLevel = level.toLowerCase();
    const selectedQuestions = quizData[normalizedDomain]?.[normalizedLevel] || [];
    setQuestions(selectedQuestions);
  }, [domain, level]);

  const handleOptionChange = (index, selectedOption) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [index]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (currentAnswers[index] === q.answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        {domain} - {level} Quiz
      </h2>

      {questions.length === 0 ? (
        <p className="text-red-500">No questions found for {domain} - {level}</p>
      ) : (
        <form>
          {questions.map((q, index) => (
            <div key={index} className="mb-6 p-4 border rounded shadow">
              <p className="font-medium mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <label key={i} className="block">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      disabled={submitted}
                      checked={currentAnswers[index] === option}
                      onChange={() => handleOptionChange(index, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>

              {submitted && (
                <p className={`mt-2 text-sm ${currentAnswers[index] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                  {currentAnswers[index] === q.answer ? '✅ Correct' : `❌ Correct Answer: ${q.answer}`}
                </p>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
            >
              Submit Quiz
            </button>
          ) : (
            <p className="text-lg font-semibold mt-4 text-green-700">
              Your Score: {score} / {questions.length}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default QuizPage;
