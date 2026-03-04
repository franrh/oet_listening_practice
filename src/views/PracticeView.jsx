import { useState, useCallback, useEffect } from 'react';
import { COLORS } from '../styles/theme';
import AudioPlayer from '../components/AudioPlayer';
import ProgressBar from '../components/ProgressBar';
import NoteCompletionQuestion from '../components/NoteCompletionQuestion';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import ResultsView from '../components/ResultsView';

export default function PracticeView({ script, onBack }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const totalQ = script.questions.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(Boolean).length;

  const handleAnswer = useCallback((qId, isCorrect) => {
    setAnswers((prev) => ({ ...prev, [qId]: isCorrect }));
  }, []);

  useEffect(() => {
    if (answeredCount === totalQ && answeredCount > 0) {
      const timer = setTimeout(() => setShowResults(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [answeredCount, totalQ]);

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Force re-render of question components
  };

  if (showResults) {
    return (
      <div>
        <BackButton onClick={onBack} />
        <ResultsView
          correct={correctCount}
          total={totalQ}
          onRestart={handleRestart}
          onHome={onBack}
        />
      </div>
    );
  }

  // Build speaker info string
  const speakerInfo = script.speakers.nurse
    || script.speakers.patient
    || script.speakers.presenter
    || '';

  return (
    <div>
      <BackButton onClick={onBack} />

      {/* Script info header */}
      <div
        className="animate-fade-in practice-header-inner"
        style={{
          background: COLORS.white,
          borderRadius: 16,
          padding: '28px 30px',
          marginBottom: 22,
          border: `1.5px solid ${COLORS.grayMid}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 32 }}>{script.icon}</span>
          <span style={{
            padding: '3px 10px', borderRadius: 6,
            fontSize: 11, fontWeight: 700,
            background: script.part === 'A' ? COLORS.orangeSubtle : 'rgba(4,4,4,0.06)',
            color: script.part === 'A' ? COLORS.orange : COLORS.raisinBlack,
          }}>
            Part {script.part}
          </span>
        </div>

        <h2 style={{
          fontSize: 24, fontWeight: 800,
          color: COLORS.richBlack, marginBottom: 8,
        }}>
          {script.title}
        </h2>

        <div style={{
          display: 'flex', gap: 18, flexWrap: 'wrap',
          fontSize: 13, color: COLORS.grayText, marginBottom: 14,
        }}>
          <span>⏱ {script.duration}</span>
          <span>📍 {script.setting}</span>
          <span>👤 {speakerInfo}</span>
        </div>

        <p style={{ fontSize: 14, color: COLORS.grayText, margin: 0, lineHeight: 1.6 }}>
          {script.scenario}
        </p>

        <div style={{ marginTop: 20 }}>
          <AudioPlayer script={script} />
        </div>
      </div>

      {/* Progress */}
      <ProgressBar current={answeredCount} total={totalQ} correct={correctCount} />

      {/* Instructions */}
      <div style={{
        background: COLORS.orangeSubtle,
        border: `1.5px solid ${COLORS.orangeBorder}`,
        borderRadius: 12,
        padding: '14px 20px',
        marginBottom: 20,
        fontSize: 13,
        color: COLORS.orangeDark,
        fontWeight: 500,
        lineHeight: 1.6,
      }}>
        {script.part === 'A' ? (
          <><strong>Instructions:</strong> Listen to the recording and complete the notes below. Write no more than three words for each answer.</>
        ) : (
          <><strong>Instructions:</strong> Listen to the presentation and choose the best answer (A, B, C, or D) for each question.</>
        )}
      </div>

      {/* Questions */}
      {script.questions.map((q, i) =>
        script.part === 'A' ? (
          <NoteCompletionQuestion
            key={`${script.id}-${q.id}-${Object.keys(answers).length === 0 ? 'fresh' : 'active'}`}
            question={q}
            index={i}
            onAnswer={(correct) => handleAnswer(q.id, correct)}
          />
        ) : (
          <MultipleChoiceQuestion
            key={`${script.id}-${q.id}-${Object.keys(answers).length === 0 ? 'fresh' : 'active'}`}
            question={q}
            index={i}
            onAnswer={(correct) => handleAnswer(q.id, correct)}
          />
        )
      )}
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 16px',
        border: 'none',
        background: 'transparent',
        color: COLORS.spanishGray,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        marginBottom: 16,
        borderRadius: 8,
        transition: 'color 0.2s',
        fontFamily: 'inherit',
      }}
    >
      ← Back to scripts
    </button>
  );
}
