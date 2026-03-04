import { COLORS } from '../styles/theme';
import ScriptCard from '../components/ScriptCard';

export default function HomeView({ scripts, onSelect, filter, setFilter }) {
  const partA = scripts.filter((s) => s.part === 'A');
  const partB = scripts.filter((s) => s.part === 'B');

  const filters = [
    { key: 'all', label: 'All Scripts' },
    { key: 'A', label: 'Part A · Note Completion' },
    { key: 'B', label: 'Part B · Multiple Choice' },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '48px 0 36px' }}>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 800,
          color: COLORS.richBlack,
          lineHeight: 1.15,
          marginBottom: 12,
          letterSpacing: -1,
        }}>
          OET Nursing{' '}
          <span style={{ color: COLORS.orange }}>Listening</span>{' '}
          Practice
        </h1>
        <p style={{
          fontSize: 16, color: COLORS.grayText,
          maxWidth: 520, margin: '0 auto', lineHeight: 1.6,
        }}>
          Practise with realistic clinical scenarios aligned to the OET Nursing Listening sub-test format. Listen, answer, and get instant feedback.
        </p>

        {/* Stats */}
        <div className="hero-stats" style={{
          display: 'flex', justifyContent: 'center',
          gap: 36, margin: '32px 0', flexWrap: 'wrap',
        }}>
          {[
            { num: '15', label: 'Audio Scripts' },
            { num: '138', label: 'Questions' },
            { num: '2', label: 'Question Types' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.orange }}>{s.num}</div>
              <div style={{
                fontSize: 11, color: COLORS.spanishGray,
                textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 600,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: filter === f.key ? 'none' : `1.5px solid ${COLORS.grayMid}`,
              background: filter === f.key ? COLORS.richBlack : COLORS.white,
              color: filter === f.key ? COLORS.white : COLORS.raisinBlack,
              fontSize: 13, fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >{f.label}</button>
        ))}
      </div>

      {/* Part A */}
      {(filter === 'all' || filter === 'A') && (
        <>
          <div style={{
            fontSize: 18, fontWeight: 700,
            color: COLORS.richBlack,
            marginBottom: 18, paddingBottom: 10,
            borderBottom: `3px solid ${COLORS.orange}`,
            display: 'inline-block',
          }}>
            Part A — Nurse-Patient Consultations
          </div>
          <div className="grid-cards" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16, marginBottom: 36,
          }}>
            {partA.map((s, i) => (
              <ScriptCard key={s.id} script={s} index={i} onClick={() => onSelect(s)} />
            ))}
          </div>
        </>
      )}

      {/* Part B */}
      {(filter === 'all' || filter === 'B') && (
        <>
          <div style={{
            fontSize: 18, fontWeight: 700,
            color: COLORS.richBlack,
            marginBottom: 18, paddingBottom: 10,
            borderBottom: `3px solid ${COLORS.orange}`,
            display: 'inline-block',
          }}>
            Part B — Health Presentations
          </div>
          <div className="grid-cards" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16, marginBottom: 36,
          }}>
            {partB.map((s, i) => (
              <ScriptCard key={s.id} script={s} index={i} onClick={() => onSelect(s)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
