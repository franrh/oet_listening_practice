import { useState } from 'react';
import { COLORS } from '../styles/theme';

export default function ScriptCard({ script, onClick, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`animate-fade-in-up delay-${(index % 8) + 1}`}
      style={{
        background: COLORS.white,
        borderRadius: 14,
        padding: '20px 22px',
        cursor: 'pointer',
        border: `1.5px solid ${hovered ? COLORS.orange : COLORS.grayMid}`,
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered
          ? '0 8px 25px rgba(255,89,0,0.12)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 28 }}>{script.icon}</span>
        <span style={{
          display: 'inline-block',
          padding: '3px 10px',
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          background: script.part === 'A' ? COLORS.orangeSubtle : 'rgba(4,4,4,0.06)',
          color: script.part === 'A' ? COLORS.orange : COLORS.raisinBlack,
          letterSpacing: 0.5,
        }}>
          Part {script.part} · {script.part === 'A' ? 'Note Completion' : 'Multiple Choice'}
        </span>
      </div>

      <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.richBlack, lineHeight: 1.3 }}>
        {script.title}
      </div>

      <div style={{ fontSize: 12, color: COLORS.spanishGray, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <span>⏱ {script.duration}</span>
        <span>📍 {script.setting}</span>
        <span>❓ {script.questions.length} questions</span>
      </div>

      <div style={{ fontSize: 13, color: COLORS.grayText, lineHeight: 1.5 }}>
        {script.scenario}
      </div>
    </div>
  );
}
