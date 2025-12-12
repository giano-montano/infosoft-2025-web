import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'INFOSOFT 2025 - Tecnología, Innovación e Investigación'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '80px',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #00803c, #fba527)',
            borderRadius: '50%',
            opacity: 0.2,
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #fd1329, #e7285e)',
            borderRadius: '50%',
            opacity: 0.2,
            filter: 'blur(80px)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #00803c, #fba527, #fd1329, #e7285e, #a855f7)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
            }}
          >
            INFOSOFT 2025
          </div>
          
          <div
            style={{
              fontSize: 40,
              color: '#e5e5e5',
              fontWeight: 400,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Tecnología, Innovación e Investigación
          </div>
          
          <div
            style={{
              fontSize: 32,
              color: '#a3a3a3',
              marginTop: '40px',
            }}
          >
            17 - 19 de Diciembre · Campus PUCP
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
