import { useState } from 'react';
import { COLORS } from '../styles/theme';

const DIFFICULTY_COLORS = {
  easy: { bg: '#E8F5E9', color: '#2E7D32' },
  medium: { bg: '#FFF3E0', color: '#E65100' },
  hard: { bg: '#FFEBEE', color: '#C62828' },
};

export default function MultipleChoiceQuestion({ question, onAnswer, index }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleCheck = () => {
    if (!selected || feedback) return;
    const isCorrect = selected === question.correctAnswer;
    setFeedback({ correct: isCorrect });
    onAnswer(isCorrect);
  };

  const dc = DIFFICULTY_COLORS[question.difficulty] || DIFFICULTY_COLORS.medium;

  const getOptionStyle = (key) => {
    let bg = COLORS.grayLight;
    let border = COLORS.grayMid;
    let color = COLORS.raisinBlack;
    let weight = 500;

    if (feedback) {
      if (key === question.correctAnswer) {
        bg = COLORS.greenBg;
        border = COLORS.greenCorrect;
        color = COLORS.greenCorrect;
        weight = 700;
      } else if (key === selected && !feedback.correct) {
        bg = COLORS.redBg;
        border = COLORS.redIncorrect;
        color = COLORS.redIncorrect;
        weight = 600;
      }
    } else if (selected === key) {
      bg = COLORS.orangeSubtle;
      border = COLORS.orange;
      color = COLORS.orange;
      weight = 700;
    }

    return {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '13px 18px',
      marginBottom: 8,
      borderRadius: 10,
      border: `2px solid ${border}`,
      background: bg,
      color,
      fontSize: 14,
      fontWeight: weight,
      cursor: feedback ? 'default' : 'pointer',
      transition: 'all 0.2s',
      fontFamily: 'inherit',
      lineHeight: 1.5,
    };
  };

  return (
    <div
      className={`animate-fade-in-up delay-${Math.min(index + 1, 8)}`}
      style={{
        background: COLORS.white,
        borderRadius: 14,
        padding: '24px 26px',
        marginBottom: 14,
        border: `1.5px solid ${
          feedback
            ? (feedback.correct ? COLORS.greenBorder : COLORS.redBorder)
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

      {/* Question text */}
      <div style={{
        fontSize: 15, lineHeight: 1.6,
        color: COLORS.raisinBlack, marginBottom: 16, fontWeight: 500,
      }}>
        {question.questionText}
      </div>

      {/* Options */}
      {Object.entries(question.options).map(([key, value]) => (
        <button
          key={key}
          style={getOptionStyle(key)}
          onClick={() => !feedback && setSelected(key)}
          disabled={!!feedback}
        >
          <strong>{key}.</strong> {value}
        </button>
      ))}

      {/* Check button */}
      {!feedback && (
        <button
          onClick={handleCheck}
          disabled={!selected}
          style={{
            padding: '10px 24px',
            borderRadius: 10,
            border: 'none',
            background: !selected ? COLORS.grayMid : COLORS.orange,
            color: !selected ? COLORS.spanishGray : COLORS.white,
            fontSize: 14, fontWeight: 700,
            cursor: !selected ? 'default' : 'pointer',
            transition: 'all 0.2s',
            marginTop: 6,
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
            : `✗ The correct answer is ${question.correctAnswer}: ${question.options[question.correctAnswer]}`
          }
        </div>
      )}
    </div>
  );
}
