import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { domain, level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch questions from the server
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      
      // NOTE: Ensure your Express server is running and accessible at the root.
      // We are calling the route defined in quizRoutes.js: router.get('/:domain/:level', ...)
      try {
        const response = await fetch(`/api/quiz/${domain}/${level}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // The data returned from the API should be an array of question objects (length 3 if the DB is seeded correctly)
        setQuestions(data); 
      } catch (e) {
        console.error('Fetch error:', e);
        setError('Could not load quiz questions. Check server connection and domain/level parameters.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [domain, level]); // Re-fetch when domain or level changes

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

  if (isLoading) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <p className="text-xl font-medium text-blue-500">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
        {domain} - {level} Quiz
      </h2>

      {questions.length === 0 ? (
        <p className="text-red-500 bg-red-50 p-4 rounded-lg">
          No questions found for <span className="font-bold">{domain} - {level}</span>.
          Please check your database seeding.
        </p>
      ) : (
        <form>
          {questions.map((q, index) => (
            <div key={index} className="mb-6 p-6 border border-gray-200 rounded-xl shadow-lg bg-white transition duration-300 hover:shadow-xl">
              <p className="font-semibold text-xl text-gray-700 mb-4">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-3">
                {/* Check if options is an array before mapping */}
                {Array.isArray(q.options) && q.options.map((option, i) => (
                  <label key={i} className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150 ease-in-out">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      disabled={submitted}
                      checked={currentAnswers[index] === option}
                      onChange={() => handleOptionChange(index, option)}
                      className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <span className="text-gray-600">{option}</span>
                  </label>
                ))}
              </div>

              {submitted && (
                <div className="mt-4 pt-3 border-t">
                  <p className={`text-sm font-medium ${currentAnswers[index] === q.answer ? 'text-green-700' : 'text-red-700'}`}>
                    {currentAnswers[index] === q.answer 
                      ? '✅ Correct Answer!' 
                      : `❌ Incorrect. Correct Answer: ${q.answer}`}
                  </p>
                </div>
              )}
            </div>
          ))}

          <div className="mt-8 flex justify-end">
            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Submit Quiz
              </button>
            ) : (
              <div className="bg-green-100 p-4 rounded-xl shadow-inner">
                <p className="text-xl font-bold text-green-800">
                  Quiz Completed! Your Score: {score} / {questions.length}
                </p>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default QuizPage;
