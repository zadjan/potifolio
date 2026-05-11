import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#050508',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          border: '1px solid rgba(0,255,148,0.6)',
        }}
      >
        {/* Corner accents */}
        <div style={{ position: 'absolute', top: 1, left: 1, width: 4, height: 1, background: '#00FF94', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 1, left: 1, width: 1, height: 4, background: '#00FF94', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 1, right: 1, width: 4, height: 1, background: '#00FF94', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 1, right: 1, width: 1, height: 4, background: '#00FF94', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 1, left: 1, width: 4, height: 1, background: '#00FF94', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 1, left: 1, width: 1, height: 4, background: '#00FF94', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 1, right: 1, width: 4, height: 1, background: '#00FF94', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 1, right: 1, width: 1, height: 4, background: '#00FF94', display: 'flex' }} />

        {/* OZ text */}
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 700,
            color: '#00FF94',
            letterSpacing: '-0.5px',
            textShadow: '0 0 6px #00FF94',
          }}
        >
          OZ
        </span>
      </div>
    ),
    { width: 32, height: 32 }
  )
}
