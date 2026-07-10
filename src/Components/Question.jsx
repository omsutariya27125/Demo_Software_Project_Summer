import { useState, useEffect } from 'react';
import './Question.css';

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
    },
    {
        id: 'math4',
        type: 'subjective',
        text: 'Prove that the sum of angles in a triangle is 180 degrees.',
        modelAnswer:
            'Draw a line parallel to one side through the opposite vertex. Use alternate interior angles to show the three angles form a straight line (180°).',
    },
    {
        id: 'math5',
        type: 'subjective',
        text: 'Find the derivative of f(x) = 3x² + 2x - 5 with respect to x.',
        modelAnswer: "f'(x) = 6x + 2",
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
}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [subjectiveAnswer, setSubjectiveAnswer] = useState('');

    const handleOptionChange = (optionId) => {
        if (submitted) return;
        setSelectedOption(optionId);
        onAnswer(question.id, optionId);
    };

    return (
        <div className="question-card">
            <div className="question-text">{question.text}</div>

            {question.type === 'mcq' ? (
                <div className="options-list">
                    {question.options.map((option) => {
                        const isSelected = selectedOption === option.id;
                        const isCorrectOption =
                            submitted && option.id === question.correctOptionId;
                        const isWrongSelection =
                            submitted && isSelected && option.id !== question.correctOptionId;

                        return (
                            <label
                                key={option.id}
                                className={`option-item ${isSelected ? 'selected' : ''} ${isCorrectOption ? 'correct' : ''
                                    } ${isWrongSelection ? 'wrong' : ''} ${submitted ? 'disabled' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name={question.id}
                                    checked={isSelected}
                                    onChange={() => handleOptionChange(option.id)}
                                    disabled={submitted}
                                />
                                <span className="option-text">{option.text}</span>
                                {isCorrectOption && <span className="badge correct-badge">Correct</span>}
                                {isWrongSelection && <span className="badge wrong-badge">Wrong</span>}
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
                    <span className="already-checked">✓ Checked</span>
                )}

                <button onClick={onNext} disabled={isLast}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default function Question({ onBackToChapters }) {
    const [answers, setAnswers] = useState({});
    const [submittedQuestions, setSubmittedQuestions] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mathGeniusTheme') === 'dark');

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

    const handleAnswer = (questionId, answer) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleCheck = (questionId) => {
        setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    };

    const goToPrevious = () =>
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const goToNext = () =>
        setCurrentIndex((prev) => Math.min(prev + 1, mathQuestions.length - 1));

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    const currentQuestion = mathQuestions[currentIndex];
    const isCurrentSubmitted = !!submittedQuestions[currentQuestion.id];

    return (

        <>
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

            <div className={`question-page ${darkMode ? 'dark' : ''}`}>
                {/* Top bar – outside the question card, at the very top of the page */}


                <h1 className="page-title">Mathematics Practice Questions</h1>
                <p className="page-subtitle">
                    Answer each question and click "Check Answer" to see if you're right.
                </p>

                <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    submitted={isCurrentSubmitted}
                    onCheck={handleCheck}
                    onAnswer={handleAnswer}
                    onPrev={goToPrevious}
                    onNext={goToNext}
                    isFirst={currentIndex === 0}
                    isLast={currentIndex === mathQuestions.length - 1}
                />
            </div>
        </>
    );
}