import { useEffect, useRef, useId } from 'react'
import './App.css'
import { LORE_BANNER, LORE_SECTION } from './lore'

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
      color: string
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 2
      particles.push({
        x: centerX + (Math.random() - 0.5) * 200,
        y: centerY + (Math.random() - 0.5) * 200,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2,
        life: 0,
        maxLife: 50 + Math.random() * 100,
        color: Math.random() > 0.5 ? 'cyan' : 'gold',
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 15, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (Math.random() < 0.3) createParticle()

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life++
        p.vy += 0.02

        if (p.life > p.maxLife) {
          particles.splice(i, 1)
          return
        }

        const alpha = 1 - p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color === 'cyan'
          ? `rgba(0, 212, 255, ${alpha})`
          : `rgba(255, 215, 0, ${alpha})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}

function LightningBolts() {
  const id1 = useId()
  const id2 = useId()
  const id3 = useId()
  return (
    <>
      <svg className="lightning-bolt lightning-bolt-1" viewBox="0 0 24 48">
        <defs>
          <linearGradient id={id1} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
        </defs>
        <path d="M14 0L6 24h6l-4 24 16-24h-6l4-24z" fill={`url(#${id1})`} />
      </svg>
      <svg className="lightning-bolt lightning-bolt-2" viewBox="0 0 24 48">
        <defs>
          <linearGradient id={id2} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
        <path d="M14 0L6 24h6l-4 24 16-24h-6l4-24z" fill={`url(#${id2})`} />
      </svg>
      <svg className="lightning-bolt lightning-bolt-3" viewBox="0 0 24 48">
        <defs>
          <linearGradient id={id3} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
        </defs>
        <path d="M14 0L6 24h6l-4 24 16-24h-6l4-24z" fill={`url(#${id3})`} />
      </svg>
    </>
  )
}

function App() {
  return (
    <div className="creatine-landing">
      <div className="particle-layer">
        <ParticleCanvas />
      </div>

      {/* Lore Banner */}
      <div className="lore-banner">
        <div className="lore-banner-track">
          {[...LORE_BANNER, ...LORE_BANNER].map((line, i) => (
            <span key={i} className="lore-banner-item">
              {line}
              <span className="lore-banner-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Lightning overlays */}
      <div className="lightning-container">
        <div className="lightning lightning-1" />
        <div className="lightning lightning-2" />
        <div className="lightning lightning-3" />
        <div className="lightning lightning-4" />
        <LightningBolts />
      </div>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg-glow" />
        <div className="scoop-explosion">
          <div className="scoop-core" />
          <div className="scoop-ring ring-1" />
          <div className="scoop-ring ring-2" />
          <div className="scoop-ring ring-3" />
          <div className="spark spark-1" />
          <div className="spark spark-2" />
          <div className="spark spark-3" />
          <div className="spark spark-4" />
          <div className="spark spark-5" />
          <div className="spark spark-6" />
        </div>

        <nav className="nav">
          <span className="logo">$CR8N</span>
          <div className="nav-links">
            <a href="#lore">Lore</a>
            <a href="#roadmap">Roadmap</a>
            <a href="https://x.com/CreatineCR8N" target="_blank" rel="noopener noreferrer" aria-label="Twitter">𝕏</a>
            <a href="#cta" className="nav-cta">Inject</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="hero-badge">THE GAINS TOKEN</p>
          <h1 className="hero-title">
            <span className="title-line">CREATINE</span>
            <span className="ticker">$CR8N</span>
          </h1>
          <p className="hero-tagline">
            One scoop. Infinite gains. Zero excuses.
          </p>
          <p className="hero-meme">
            Science-backed gains meet blockchain chaos. Your muscles will thank you. Your wallet might explode.
          </p>
          <div className="hero-cta-row">
            <a href="#cta" className="cta-button">
              <span className="cta-text">INJECT THE GAINS</span>
              <span className="cta-glow" />
            </a>
            <a href="https://x.com/CreatineCR8N" target="_blank" rel="noopener noreferrer" className="cta-twitter" aria-label="Follow us on X (Twitter)">
              𝕏
            </a>
          </div>
        </div>
      </header>

      {/* Lore Section */}
      <section id="lore" className="section lore-section">
        <h2 className="section-title">
          <span className="title-accent">{LORE_SECTION.title}</span>
          <span className="title-sub">{LORE_SECTION.subtitle}</span>
        </h2>
        <div className="lore-content">
          {LORE_SECTION.paragraphs.map((para, i) => (
            <p key={i} className="lore-paragraph">{para}</p>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="section roadmap">
        <h2 className="section-title">
          <span className="title-accent">ROADMAP</span>
          <span className="title-sub">The Gains Journey</span>
        </h2>
        <div className="roadmap-timeline">
          <div className="roadmap-item">
            <div className="roadmap-marker" />
            <div className="roadmap-content">
              <h3>Phase 1 — Launch</h3>
              <p>Token deploy. LP locked. Community forms. First scoop injected.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="roadmap-marker" />
            <div className="roadmap-content">
              <h3>Phase 2 — Gains</h3>
              <p>CEX listings. Partnerships. The gains go mainstream.</p>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="roadmap-marker" />
            <div className="roadmap-content">
              <h3>Phase 3 — Supernova</h3>
              <p>Ecosystem expansion. Staking. Merch. Moon or gym—you choose.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="section cta-section">
        <div className="cta-bg-glow" />
        <h2 className="cta-headline">Ready to inject?</h2>
        <p className="cta-sub">Join the gains revolution. No cap.</p>
        <div className="hero-cta-row">
          <a href="#" className="cta-button cta-button-large">
            <span className="cta-text">INJECT THE GAINS</span>
            <span className="cta-glow" />
          </a>
          <a href="https://x.com/CreatineCR8N" target="_blank" rel="noopener noreferrer" className="cta-twitter" aria-label="Follow us on X (Twitter)">
            𝕏
          </a>
        </div>
      </section>

      <footer className="footer">
        <a href="https://x.com/CreatineCR8N" target="_blank" rel="noopener noreferrer" className="footer-twitter" aria-label="Follow us on X (Twitter)">
          𝕏 Follow us on X
        </a>
        <p>$CR8N — Creatine. Gym bro meets blockchain supernova.</p>
      </footer>
    </div>
  )
}

export default App
