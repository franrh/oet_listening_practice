import { COLORS } from '../styles/theme';

export default function Header({ view, onHome, hasScript }) {
  return (
    <header style={{
      background: COLORS.richBlack,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 20px rgba(0,0,0,0.15)',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        {/* Logo */}
        <div
          onClick={onHome}
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: COLORS.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: COLORS.white,
            letterSpacing: -1, flexShrink: 0,
          }}>A</div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 17, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.2 }}>
              Anáhuac Online
            </div>
            <div style={{ color: COLORS.orange, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              OET Listening Practice
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 6 }}>
          <NavBtn active={view === 'home'} onClick={onHome}>Scripts</NavBtn>
          {hasScript && <NavBtn active={view === 'practice'}>Practice</NavBtn>}
        </nav>
      </div>
    </header>
  );
}

function NavBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderRadius: 8,
        border: 'none',
        background: active ? COLORS.orange : 'transparent',
        color: active ? COLORS.white : COLORS.spanishGray,
        fontSize: 13,
        fontWeight: 600,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
      }}
    >{children}</button>
  );
}
