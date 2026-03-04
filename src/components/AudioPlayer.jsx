import { useState, useRef, useEffect } from 'react';
import { COLORS } from '../styles/theme';

export default function AudioPlayer({ script }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasAudio, setHasAudio] = useState(false);
  const [error, setError] = useState(false);

  const audioSrc = `/audio/${script.audioFile}`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoad = () => { setHasAudio(true); setDuration(audio.duration); };
    const onTime = () => setCurrentTime(audio.currentTime);
    const onEnd = () => setIsPlaying(false);
    const onError = () => { setError(true); setHasAudio(false); };

    audio.addEventListener('loadedmetadata', onLoad);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoad);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = () => {
    if (!hasAudio) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!hasAudio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div style={{
      background: COLORS.richBlack,
      borderRadius: 12,
      padding: '20px 24px',
    }}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Play button */}
        <button
          onClick={togglePlay}
          style={{
            width: 52, height: 52,
            borderRadius: '50%',
            border: 'none',
            background: hasAudio ? COLORS.orange : COLORS.spanishGray,
            color: COLORS.white,
            fontSize: 18,
            cursor: hasAudio ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'transform 0.2s, background 0.2s',
            fontFamily: 'inherit',
          }}
          title={hasAudio ? (isPlaying ? 'Pause' : 'Play') : 'No audio file found'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* Info + progress */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div>
              <div style={{
                color: COLORS.spanishGray, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
              }}>
                Audio · {script.duration}
              </div>
              <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginTop: 2 }}>
                {script.title}
              </div>
            </div>
            {hasAudio && (
              <span style={{ color: COLORS.spanishGray, fontSize: 12, fontWeight: 500, flexShrink: 0, marginLeft: 12 }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}
          </div>

          {/* Progress bar */}
          {hasAudio ? (
            <div
              onClick={handleSeek}
              style={{
                height: 6, borderRadius: 3,
                background: 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                marginTop: 10,
                overflow: 'hidden',
              }}
            >
              <div style={{
                width: `${progress}%`,
                height: '100%',
                borderRadius: 3,
                background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                transition: 'width 0.1s linear',
              }} />
            </div>
          ) : (
            <div style={{
              color: COLORS.orange,
              fontSize: 12,
              marginTop: 8,
              fontStyle: 'italic',
            }}>
              {error
                ? `Audio not found. Place your MP3 at: /public/audio/${script.audioFile}`
                : 'Loading audio...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
