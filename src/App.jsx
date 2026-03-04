import { useState } from 'react';
import './styles/global.css';
import { COLORS } from './styles/theme';
import questionBank from './data/questionBank.json';
import Header from './components/Header';
import HomeView from './views/HomeView';
import PracticeView from './views/PracticeView';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedScript, setSelectedScript] = useState(null);
  const [filter, setFilter] = useState('all');

  // Add icon mapping (JSON doesn't store emojis well, so we add them here)
  const iconMap = {
    partA_01: '🏥', partA_02: '💉', partA_03: '🫁', partA_04: '🏠',
    partA_05: '🤰', partA_06: '❤️', partA_07: '👶', partA_08: '🦶',
    partB_09: '🦠', partB_10: '💊', partB_11: '🍎', partB_12: '🚭',
    partB_13: '🕊️', partB_14: '⚕️', partB_15: '🧠',
  };

  const scripts = questionBank.scripts.map((s) => ({
    ...s,
    icon: iconMap[s.id] || '📋',
  }));

  const handleSelect = (script) => {
    setSelectedScript(script);
    setView('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHome = () => {
    setView('home');
    setSelectedScript(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: COLORS.grayLight,
    }}>
      <Header view={view} onHome={handleHome} hasScript={!!selectedScript} />

      <main style={{
        flex: 1,
        maxWidth: 1100,
        width: '100%',
        margin: '0 auto',
        padding: '32px 24px 80px',
      }}>
        {view === 'home' && (
          <HomeView
            scripts={scripts}
            onSelect={handleSelect}
            filter={filter}
            setFilter={setFilter}
          />
        )}
        {view === 'practice' && selectedScript && (
          <PracticeView script={selectedScript} onBack={handleHome} />
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '28px 24px',
        fontSize: 12,
        color: COLORS.spanishGray,
        borderTop: `1px solid ${COLORS.grayMid}`,
        background: COLORS.white,
      }}>
        Anáhuac Online · OET Nursing Listening Practice · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
