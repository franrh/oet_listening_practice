import { useState } from 'react';
import { COLORS } from '../styles/theme';

const DIFFICULTY_COLORS = {
  easy: { bg: '#E8F5E9', color: '#2E7D32' },
  medium: { bg: '#FFF3E0', color: '#E65100' },
  hard: { bg: '#FFEBEE', color: '#C62828' },
};

export default function NoteCompletionQuestion({ question, onAnswer, index }) {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  const parts = question.noteContext.split('___');
  const status = feedback ? (feedback.correct ? 'correct' : 'incorrect') : null;

  const handleCheck = () => {
    if (!input.trim() || feedback) return;
    const normalized = input.toLowerCase().trim();
    const isCorrect = question.acceptableAnswers.some(
      (a) => normalized === a.toLowerCase() || normalized.includes(a.toLowerCase())
    );
    setFeedback({ correct: isCorrect });
    onAnswer(isCorrect);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCheck();
  };

  const dc = DIFFICULTY_COLORS[question.difficulty] || DIFFICULTY_COLORS.medium;

  return (
    <div
      className={`animate-fade-in-up delay-${Math.min(index + 1, 8)}`}
      style={{
        background: COLORS.white,
        borderRadius: 14,
        padding: '24px 26px',
        marginBottom: 14,
        border: `1.5px solid ${
          status === 'correct' ? COLORS.greenBorder
          : status === 'incorrect' ? COLORS.redBorder
          : COLORS.grayMid
        }`,
        transition: 'border-color 0.3s',
      }}
    >
      {/* Question header */}
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontSize: 12, fontWeight: 700, color: COLORS.orange,
          textTransform: 'uppercase', letterSpacing: 1,
        }}>
          Question {question.number}
        </span>
        <span style={{
          padding: '2px 8px', borderRadius: 4,
          fontSize: 10, fontWeight: 700,
          background: dc.bg, color: dc.color,
          textTransform: 'uppercase', letterSpacing: 0.5,
        }}>
          {question.difficulty}
        </span>
      </div>

      {/* Note context with input */}
      <div style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.raisinBlack, marginBottom: 14 }}>
        {parts[0]}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type answer..."
          disabled={!!feedback}
          style={{
            display: 'inline-block',
            minWidth: 140, maxWidth: 260,
            padding: '7px 14px',
            border: `2px solid ${
              status === 'correct' ? COLORS.greenCorrect
              : status === 'incorrect' ? COLORS.redIncorrect
              : COLORS.orangeBorder
            }`,
            borderRadius: 8,
            fontSize: 15, fontWeight: 600,
            color: COLORS.raisinBlack,
            background: status === 'correct' ? COLORS.greenBg
              : status === 'incorrect' ? COLORS.redBg
              : COLORS.orangeSubtle,
            outline: 'none',
            transition: 'all 0.3s',
            fontFamily: 'inherit',
            verticalAlign: 'middle',
          }}
        />
        {parts[1] || ''}
      </div>

      {/* Check button */}
      {!feedback && (
        <button
          onClick={handleCheck}
          disabled={!input.trim()}
          style={{
            padding: '10px 24px',
            borderRadius: 10,
            border: 'none',
            background: !input.trim() ? COLORS.grayMid : COLORS.orange,
            color: !input.trim() ? COLORS.spanishGray : COLORS.white,
            fontSize: 14, fontWeight: 700,
            cursor: !input.trim() ? 'default' : 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
          }}
        >
          Check Answer
        </button>
      )}

      {/* Feedback */}
      {feedback && (
        <div
          className="animate-slide-down"
          style={{
            marginTop: 12,
            padding: '13px 18px',
            borderRadius: 10,
            background: feedback.correct ? COLORS.greenBg : COLORS.redBg,
            border: `1.5px solid ${feedback.correct ? COLORS.greenBorder : COLORS.redBorder}`,
            fontSize: 14, lineHeight: 1.5,
            color: feedback.correct ? COLORS.greenCorrect : COLORS.redIncorrect,
            fontWeight: 600,
          }}
        >
          {feedback.correct
            ? '✓ Correct!'
            : `✗ The correct answer is: ${question.answer}`
          }
        </div>
      )}
    </div>
  );
}
