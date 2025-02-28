import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Award, Check, X, HelpCircle, RefreshCw } from 'lucide-react';
import { quizQuestions } from '../data/quizData';
import { usePlanets } from '../context/PlanetContext';
import toast from 'react-hot-toast';
import { QuizQuestion } from '../types';

interface QuizProps {
  onBack: () => void;
  isNightMode: boolean;
}

const Quiz = ({ onBack, isNightMode }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizQuestionSet, setQuizQuestionSet] = useState<QuizQuestion[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('all');
  const [quizStarted, setQuizStarted] = useState(false);
  const { getPlanetById } = usePlanets();

  // Initialize quiz with 10 random questions
  useEffect(() => {
    resetQuiz();
  }, [difficulty]);

  const resetQuiz = () => {
    let filteredQuestions = [...quizQuestions];
    
    if (difficulty !== 'all') {
      filteredQuestions = quizQuestions.filter(q => q.difficulty === difficulty);
    }
    
    // Shuffle and take 10 questions
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    setQuizQuestionSet(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
    setQuizStarted(false);
  };

  const currentQuestion = quizQuestionSet[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      toast.success('Correct answer!');
    } else {
      toast.error('Wrong answer!');
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestionSet.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestionSet.length) * 100;
    if (percentage >= 90) return "Amazing! You're a solar system expert!";
    if (percentage >= 70) return "Great job! You know a lot about planets!";
    if (percentage >= 50) return "Good effort! Keep learning about space!";
    return "Keep exploring the solar system to learn more!";
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestionSet.length) * 100;
    if (percentage >= 90) return "text-green-400";
    if (percentage >= 70) return "text-green-500";
    if (percentage >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  // Get planet image for the question if it's about a specific planet
  const getPlanetImage = () => {
    if (currentQuestion?.planetId) {
      const planet = getPlanetById(currentQuestion.planetId);
      if (planet) {
        // Use the same image mapping as in the Planet component
        const planetImages: Record<string, string> = {
          'sun': 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?q=80&w=500&auto=format&fit=crop',
          'mercury': 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=500&auto=format&fit=crop',
          'venus': 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=500&auto=format&fit=crop',
          'earth': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=500&auto=format&fit=crop',
          'mars': 'https://images.unsplash.com/photo-1573588028698-f4759befb09a?q=80&w=500&auto=format&fit=crop',
          'jupiter': 'https://images.unsplash.com/photo-1630839437035-dac17da580d0?q=80&w=500&auto=format&fit=crop',
          'saturn': 'https://images.unsplash.com/photo-1614314107768-6018061e5704?q=80&w=500&auto=format&fit=crop',
          'uranus': 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=500&auto=format&fit=crop',
          'neptune': 'https://images.unsplash.com/photo-1614314107918-2163bd6c0b90?q=80&w=500&auto=format&fit=crop'
        };
        
        return planetImages[planet.id];
      }
    }
    return null;
  };

  return (
    <div className={`w-full max-w-3xl p-6 ${isNightMode ? 'bg-gray-900' : 'bg-indigo-900'} rounded-lg shadow-xl relative`}>
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Solar System Quiz</h1>
        <p className="text-gray-300 mt-2">Test your knowledge about our planetary neighbors!</p>
      </div>

      {!quizStarted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-xl text-white mb-6">Select difficulty level:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setDifficulty('easy')}
              className={`p-4 rounded-lg transition-colors ${difficulty === 'easy' ? 'bg-green-600' : 'bg-indigo-800 hover:bg-indigo-700'}`}
            >
              <span className="text-lg font-medium">Easy</span>
              <p className="text-sm text-gray-300">For beginners</p>
            </button>
            
            <button 
              onClick={() => setDifficulty('medium')}
              className={`p-4 rounded-lg transition-colors ${difficulty === 'medium' ? 'bg-yellow-600' : 'bg-indigo-800 hover:bg-indigo-700'}`}
            >
              <span className="text-lg font-medium">Medium</span>
              <p className="text-sm text-gray-300">Some knowledge required</p>
            </button>
            
            <button 
              onClick={() => setDifficulty('hard')}
              className={`p-4 rounded-lg transition-colors ${difficulty === 'hard' ? 'bg-red-600' : 'bg-indigo-800 hover:bg-indigo-700'}`}
            >
              <span className="text-lg font-medium">Hard</span>
              <p className="text-sm text-gray-300">For space experts</p>
            </button>
            
            <button 
              onClick={() => setDifficulty('all')}
              className={`p-4 rounded-lg transition-colors ${difficulty === 'all' ? 'bg-purple-600' : 'bg-indigo-800 hover:bg-indigo-700'}`}
            >
              <span className="text-lg font-medium">Mixed</span>
              <p className="text-sm text-gray-300">All difficulty levels</p>
            </button>
          </div>
          
          <button 
            onClick={() => setQuizStarted(true)}
            className="px-8 py-3 bg-yellow-500 text-indigo-900 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
          >
            Start Quiz
          </button>
        </motion.div>
      ) : !quizComplete ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300">
              Question {currentQuestionIndex + 1} of {quizQuestionSet.length}
            </span>
            <span className="text-gray-300">
              Score: {score}
            </span>
          </div>
          
          <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
            <div 
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestionSet.length) * 100}%` }}
            ></div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                {currentQuestion?.question}
              </h2>
              
              {getPlanetImage() && (
                <div className="mb-4 flex justify-center">
                  <img 
                    src={getPlanetImage() || ''} 
                    alt="Planet" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-700"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                {currentQuestion?.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      isAnswered
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-600'
                          : selectedAnswer === option
                            ? 'bg-red-600'
                            : 'bg-indigo-800 opacity-70'
                        : 'bg-indigo-800 hover:bg-indigo-700'
                    }`}
                  >
                    <div className="flex items-center">
                      {isAnswered && option === currentQuestion.correctAnswer && (
                        <Check size={18} className="mr-2 text-green-300" />
                      )}
                      {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                        <X size={18} className="mr-2 text-red-300" />
                      )}
                      {option}
                    </div>
                  </button>
                ))}
              </div>
              
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-indigo-800 bg-opacity-50 rounded-lg"
                >
                  <p className="text-gray-200">
                    <span className="font-semibold text-yellow-400">Explanation: </span>
                    {currentQuestion?.explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-6">
            <Award size={80} className="mx-auto text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className={`text-xl font-semibold ${getScoreColor()}`}>
              Your score: {score} out of {quizQuestionSet.length}
            </p>
            <p className="text-gray-300 mt-2">{getScoreMessage()}</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
            <button 
              onClick={resetQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw size={18} className="mr-2" />
              Try Again
            </button>
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-yellow-500 text-indigo-900 rounded-lg font-medium flex items-center justify-center hover:bg-yellow-400 transition-colors"
            >
              <HelpCircle size={18} className="mr-2" />
              Explore Solar System
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;