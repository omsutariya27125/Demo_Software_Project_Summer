import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Question.css';
import {apiGet} from '../Utils/api';

const mathQuestions = [
    {
        id: 'math1',
        type: 'mcq',
        text: 'What is the value of π (pi) rounded to two decimal places?',
        options: [
            { id: 'a', text: '3.14' },
            { id: 'b', text: '3.16' },
            { id: 'c', text: '2.14' },
            { id: 'd', text: '3.12' },
        ],
        correctOptionId: 'a',
        solution: 'π (pi) is a mathematical constant approximately equal to 3.14159... When rounded to two decimal places, it equals 3.14.',
    },
    {
        id: 'math2',
        type: 'mcq',
        text: 'Solve for x: 2x + 5 = 15',
        options: [
            { id: 'a', text: 'x = 10' },
            { id: 'b', text: 'x = 5' },
            { id: 'c', text: 'x = 7' },
            { id: 'd', text: 'x = -5' },
        ],
        correctOptionId: 'b',
        solution: 'Starting with 2x + 5 = 15, subtract 5 from both sides: 2x = 10. Then divide both sides by 2: x = 5.',
    },
    {
        id: 'math3',
        type: 'mcq',
        text: 'What is the area of a circle with radius r?',
        options: [
            { id: 'a', text: 'πr²' },
            { id: 'b', text: '2πr' },
            { id: 'c', text: 'πd' },
            { id: 'd', text: '4πr²' },
        ],
        correctOptionId: 'a',
        solution: 'The area of a circle is calculated using the formula A = πr², where r is the radius. This comes from integrating the circumference or using the geometric derivation of circular areas.',
    },
    {
        id: 'math4',
        type: 'subjective',
        text: 'Prove that the sum of angles in a triangle is 180 degrees.',
        modelAnswer:
            'Draw a line parallel to one side through the opposite vertex. Use alternate interior angles to show the three angles form a straight line (180°).',
        solution: 'This can be proven using the properties of parallel lines. When you draw a line parallel to the base through the opposite vertex, the alternate interior angles are equal to the base angles of the triangle. Since the angles on a straight line sum to 180°, the three angles of the triangle must also sum to 180°.',
    },
    {
        id: 'math5',
        type: 'subjective',
        text: 'Find the derivative of f(x) = 3x² + 2x - 5 with respect to x.',
        modelAnswer: "f'(x) = 6x + 2",
        solution: "Using the power rule, the derivative of 3x² is 6x, the derivative of 2x is 2, and the derivative of -5 (constant) is 0. Therefore, f'(x) = 6x + 2.",
    },
];

function QuestionCard({
    question,
    submitted,
    onCheck,
    onAnswer,
    onPrev,
    onNext,
    isFirst,
    isLast,
    onReset,
}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [subjectiveAnswer, setSubjectiveAnswer] = useState('');
    const [showSolution, setShowSolution] = useState(false);

    const handleOptionChange = (optionId) => {
        if (submitted) return;
        setSelectedOption(optionId);
        onAnswer(question.id, optionId);
    };

    const handleReset = () => {
        setSelectedOption(null);
        setSubjectiveAnswer('');
        setShowSolution(false);
        onReset(question.id);
    };

    return (
        <div className="question-card">
            <div className="question-text">{question.text}</div>

            {question.type === 'mcq' ? (
                <div className="options-list">
                    {question.options.map((option) => {
                        const isSelected = selectedOption === option.id;
                        const isSelectedCorrect = submitted && isSelected && option.id === question.correctOptionId;
                        const isSelectedWrong = submitted && isSelected && option.id !== question.correctOptionId;
                        const isCorrectHighlight = isSelectedCorrect || (submitted && showSolution && option.id === question.correctOptionId);
                        return (
                            <label
                                key={option.id}
                                className={`option-item ${isSelected ? 'selected' : ''} ${isCorrectHighlight ? 'correct' : ''} 
                                    ${isSelectedWrong ? 'wrong' : ''} ${submitted ? 'disabled' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name={question.id}
                                    checked={isSelected}
                                    onChange={() => handleOptionChange(option.id)}
                                    disabled={submitted}
                                />
                                <span className="option-text">{option.text}</span>
                                {isCorrectHighlight && <span className="badge correct-badge">Correct</span>}
                                {isSelectedWrong && <span className="badge wrong-badge">Wrong</span>}
                            </label>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <textarea
                        className="answer-textarea"
                        rows="4"
                        placeholder="Type your answer here..."
                        value={subjectiveAnswer}
                        onChange={(e) => {
                            if (submitted) return;
                            setSubjectiveAnswer(e.target.value);
                            onAnswer(question.id, e.target.value);
                        }}
                        disabled={submitted}
                    />
                    {submitted && (
                        <div className="model-answer">
                            <strong>Model Answer</strong>
                            <p>{question.modelAnswer}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Navigation row with Check Answer centered */}
            <div className="nav-buttons">
                <button onClick={onPrev} disabled={isFirst}>
                    Previous
                </button>

                {!submitted ? (
                    <button
                        className="check-button"
                        onClick={() => onCheck(question.id)}
                        disabled={
                            question.type === 'mcq'
                                ? !selectedOption
                                : !subjectiveAnswer.trim()
                        }
                    >
                        Check Answer
                    </button>
                ) : (
                    <div className="button-group">
                        <span className="already-checked">✓ Checked</span>
                        <button 
                            className="show-solution-button"
                            onClick={() => setShowSolution(!showSolution)}
                        >
                            {showSolution ? 'Hide Solution' : 'Show Solution'}
                        </button>
                        <button 
                            className="reset-button"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                )}

                <button onClick={onNext} disabled={isLast}>
                    Next
                </button>
            </div>

            {/* Solution section */}
            {submitted && showSolution && (
                <div className="solution-section">
                    <h3>Solution</h3>
                    <p>{question.solution || (question.type === 'subjective' ? question.modelAnswer : 'Solution not available')}</p>
                </div>
            )}
        </div>
    );
}

export default function Question() {
    const [answers, setAnswers] = useState({});
    const [submittedQuestions, setSubmittedQuestions] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mathGeniusTheme') === 'dark');
    const { ChapterName } = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const nextTheme = darkMode ? 'dark' : 'light';
        localStorage.setItem('mathGeniusTheme', nextTheme);
        document.body.classList.toggle('dark-mode', darkMode);
        document.body.classList.toggle('light-mode', !darkMode);

        return () => {
            document.body.classList.remove('dark-mode');
            document.body.classList.remove('light-mode');
        };
    }, [darkMode]);

    const goToPrevious = () =>
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const goToNext = () =>
        setCurrentIndex((prev) => Math.min(prev + 1, mathQuestions.length - 1));

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const question = await apiGet(`/q/${ChapterName}`);
                console.log('Fetched question data:', question);
            } catch (error) {
                console.error('Error fetching question data:', error);
            }
        }

        getQuestion();
    }, []);

    const handleAnswer = (questionId, answer) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleCheck = (questionId) => {
        setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    };

    const handleReset = (questionId) => {
        setSubmittedQuestions((prev) => {
            const updated = { ...prev };
            delete updated[questionId];
            return updated;
        });
        setAnswers((prev) => {
            const updated = { ...prev };
            delete updated[questionId];
            return updated;
        });
    };

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    const currentQuestion = mathQuestions[currentIndex];
    const isCurrentSubmitted = !!submittedQuestions[currentQuestion.id];

    return (

        <>
            

            <div className={`question-page ${darkMode ? 'dark' : ''}`}>
                {/* Top bar – outside the question card, at the very top of the page */}
                <div className="top-bar">
                <button
                    className="back-chapters-btn"
                    onClick={() => (window.location.href = "/chapter")}
                >
                    ← Back to Chapters
                </button>
                <button className="icon-btn" onClick={toggleDarkMode} title="Toggle theme">
                    <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
            </div>

                <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    submitted={isCurrentSubmitted}
                    onCheck={handleCheck}
                    onAnswer={handleAnswer}
                    onReset={handleReset}
                    onPrev={goToPrevious}
                    onNext={goToNext}
                    isFirst={currentIndex === 0}
                    isLast={currentIndex === mathQuestions.length - 1}
                />
            </div>
        </>
    );
}