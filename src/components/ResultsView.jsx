import { COLORS } from '../styles/theme';

export default function ResultsView({ correct, total, onRestart, onHome }) {
  const pct = Math.round((correct / total) * 100);

  let emoji, msg;
  if (pct >= 80) {
    emoji = '🎉';
    msg = 'Excellent work! You demonstrate strong listening comprehension skills ready for the OET exam.';
  } else if (pct >= 60) {
    emoji = '👍';
    msg = 'Good effort! Review the answers you missed, listen to the audio again, and try once more to strengthen your skills.';
  } else {
    emoji = '💪';
    msg = "Keep practising! Listen to the audio carefully, focus on key details like numbers, names, and medical terms. You'll improve with each attempt.";
  }

  return (
    <div
      className="animate-scale-in results-card"
      style={{
        background: COLORS.white,
        borderRadius: 16,
        padding: '44px 40px',
        textAlign: 'center',
        border: `1.5px solid ${COLORS.grayMid}`,
        maxWidth: 480,
        margin: '40px auto',
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 8 }}>{emoji}</div>

      <div style={{
        fontSize: 64, fontWeight: 800,
        color: COLORS.orange, lineHeight: 1,
      }}>
        {pct}%
      </div>

      <div style={{
        fontSize: 13, color: COLORS.spanishGray,
        textTransform: 'uppercase', letterSpacing: 1.5,
        fontWeight: 600, marginTop: 8, marginBottom: 24,
      }}>
        Final Score
      </div>

      <div style={{
        fontSize: 18, fontWeight: 700,
        color: COLORS.richBlack, marginBottom: 8,
      }}>
        {correct} of {total} correct
      </div>

      <div style={{
        fontSize: 14, color: COLORS.grayText,
        lineHeight: 1.6, marginBottom: 30,
        maxWidth: 360, margin: '0 auto 30px',
      }}>
        {msg}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={onRestart}
          style={{
            padding: '14px 32px',
            borderRadius: 12,
            border: 'none',
            background: COLORS.richBlack,
            color: COLORS.white,
            fontSize: 15, fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.2s',
            fontFamily: 'inherit',
          }}
        >
          Try Again
        </button>
        <button
          onClick={onHome}
          style={{
            padding: '14px 32px',
            borderRadius: 12,
            border: `2px solid ${COLORS.grayMid}`,
            background: 'transparent',
            color: COLORS.raisinBlack,
            fontSize: 15, fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
          }}
        >
          All Scripts
        </button>
      </div>
    </div>
  );
}
