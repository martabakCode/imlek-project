import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Imlek Greeting - Year of the Fire Horse';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// All 6 templates with their styles
const TEMPLATE_STYLES = {
  'blazing-stallion': {
    background: 'linear-gradient(to bottom, #0a0a0a 0%, #1a0a0a 50%, #dc2626 100%)',
    accentColor: '#fbbf24',
    secondaryColor: '#f97316',
    horseIcon: '🐴🔥',
    title: '恭喜发财',
    subtitle: 'Gong Xi Fa Cai',
    decorations: ['🔥', '✨'],
  },
  'phoenix-horse': {
    background: 'linear-gradient(to bottom right, #4c1d95 0%, #be185d 50%, #ea580c 100%)',
    accentColor: '#fbbf24',
    secondaryColor: '#c084fc',
    horseIcon: '🐴✨',
    title: '飞马献瑞',
    subtitle: 'Flying Horse Brings Prosperity',
    decorations: ['✨', '🌟'],
  },
  'emperor-steed': {
    background: 'linear-gradient(to bottom, #7f1d1d 0%, #991b1b 50%, #fbbf24 100%)',
    accentColor: '#fbbf24',
    secondaryColor: '#fcd34d',
    horseIcon: '🐴👑',
    title: '马年大吉',
    subtitle: 'Great Luck in Horse Year',
    decorations: ['👑', '🏮'],
  },
  'celestial-horse': {
    background: 'linear-gradient(to bottom, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
    accentColor: '#60a5fa',
    secondaryColor: '#a78bfa',
    horseIcon: '🐴🌙',
    title: '天马行空',
    subtitle: 'Celestial Horse Soars',
    decorations: ['⭐', '🌙'],
  },
  'golden-lotus': {
    background: 'linear-gradient(to bottom, #134e4a 0%, #0f766e 50%, #14532d 100%)',
    accentColor: '#fbbf24',
    secondaryColor: '#34d399',
    horseIcon: '🐴🪷',
    title: '金蓮駿馬',
    subtitle: 'Golden Lotus & Noble Horse',
    decorations: ['🪷', '💧'],
  },
  'dragon-horse': {
    background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #b45309 100%)',
    accentColor: '#fbbf24',
    secondaryColor: '#dc2626',
    horseIcon: '🐴🐉',
    title: '龍馬精神',
    subtitle: 'Spirit of Dragon Horse',
    decorations: ['🐉', '🔥'],
  },
};

export default async function Image({ params }: { params: { id: string } }) {
  // Default to blazing stallion
  const template = 'blazing-stallion';
  const receiverName = 'You';
  const styles = TEMPLATE_STYLES[template as keyof typeof TEMPLATE_STYLES];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: styles.background,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: `4px solid ${styles.accentColor}`,
            borderRadius: 20,
            opacity: 0.5,
          }}
        />

        {/* Background decorations */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', display: 'flex', justifyContent: 'space-around' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 30 + i * 10,
                height: 100 + i * 20,
                borderRadius: '50%',
                background: `radial-gradient(ellipse at center, ${styles.secondaryColor}88 0%, transparent 70%)`,
                opacity: 0.3 + (i % 3) * 0.2,
              }}
            />
          ))}
        </div>

        {/* Corner decorations */}
        <div style={{ position: 'absolute', top: 40, left: 40, fontSize: 40, opacity: 0.6 }}>
          {styles.decorations[0]}
        </div>
        <div style={{ position: 'absolute', top: 40, right: 40, fontSize: 40, opacity: 0.6 }}>
          {styles.decorations[1]}
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 40, fontSize: 40, opacity: 0.6 }}>
          🏮
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: 40, opacity: 0.6 }}>
          🧧
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {/* Horse icon */}
          <div
            style={{
              fontSize: 100,
              marginBottom: 20,
              filter: `drop-shadow(0 0 20px ${styles.accentColor}80)`,
            }}
          >
            {styles.horseIcon}
          </div>

          {/* Chinese title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: styles.accentColor,
              textShadow: `0 0 40px ${styles.secondaryColor}`,
              marginBottom: 10,
              fontFamily: 'serif',
            }}
          >
            {styles.title}
          </div>

          {/* English subtitle */}
          <div
            style={{
              fontSize: 32,
              color: styles.secondaryColor,
              marginBottom: 30,
              fontFamily: 'sans-serif',
            }}
          >
            {styles.subtitle}
          </div>

          {/* Receiver name */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#ffffff',
              textShadow: `0 0 30px ${styles.accentColor}`,
              marginBottom: 20,
              fontFamily: 'sans-serif',
            }}
          >
            For {receiverName}
          </div>

          {/* Year badge */}
          <div
            style={{
              padding: '12px 30px',
              borderRadius: 30,
              background: 'linear-gradient(135deg, #dc2626, #f97316)',
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.5)',
              fontFamily: 'sans-serif',
            }}
          >
            Year of the Fire Horse 2026
          </div>
        </div>

        {/* Credit */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'sans-serif',
          }}
        >
          🥞 MartabakCode
        </div>
      </div>
    ),
    { ...size }
  );
}
