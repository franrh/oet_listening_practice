import { COLORS } from '../styles/theme';

export default function ProgressBar({ current, total, correct }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div style={{
      background: COLORS.white,
      borderRadius: 12,
      padding: '16px 22px',
      marginBottom: 20,
      border: `1.5px solid ${COLORS.grayMid}`,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.raisinBlack, whiteSpace: 'nowrap' }}>
        Progress
      </div>
      <div style={{
        flex: 1, height: 8, borderRadius: 4,
        background: COLORS.grayMid,
        minWidth: 120, overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          borderRadius: 4,
          background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
          transition: 'width 0.5s ease',
        }} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.orange, whiteSpace: 'nowrap' }}>
        {current}/{total} answered · {correct} correct
      </div>
    </div>
  );
}
