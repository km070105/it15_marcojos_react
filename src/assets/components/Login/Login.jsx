import { useState } from 'react'
import './Login.css'

// ── SVG Icons ────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
)

// ── Logo ──────────────────────────────────────────────────────────────────────
const Logo = ({ variant = 'white' }) => (
  <div className="logo-svg">
    <span className="logo-text" style={{ color: variant === 'white' ? 'white' : '#E85D04' }}>Fo</span>
    <span className={variant === 'white' ? 'logo-dot' : 'logo-dot-reg'} />
    <span className="logo-text" style={{ color: variant === 'white' ? 'white' : '#E85D04' }}>d</span>
    {variant === 'orange' && (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24"
        stroke="#E85D04" style={{ marginLeft: 6 }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )}
  </div>
)

// ── Social Buttons ────────────────────────────────────────────────────────────
const SocialButtons = ({ label }) => (
  <>
    <p className="social-label">{label}</p>
    <div className="social-row">
      {/* Facebook */}
      <button className="social-btn" aria-label="Facebook">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      {/* Google */}
      <button className="social-btn" aria-label="Google">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </button>
      {/* Twitter/X */}
      <button className="social-btn" aria-label="Twitter">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      </button>
    </div>
  </>
)

// ── Password Field ────────────────────────────────────────────────────────────
const PasswordField = ({ label, name, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false)
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>
      <div className="field-wrap">
        <input
          className="field-input has-icon"
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
        <button type="button" className="field-icon-btn" onClick={() => setShow(s => !s)}>
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  )
}

// ── SCREEN 1 — Welcome / Splash ───────────────────────────────────────────────
const WelcomeScreen = ({ onSignIn, onSignUp }) => (
  <div className="login-card">
    <div className="login-hero">
      <div className="hero-badge">
        <span className="hero-badge-text">Fast <span>Food</span></span>
      </div>
      <h1 className="hero-title">Order your favourite<br/>food right now</h1>
      <p className="hero-subtitle">Delivered hot & fresh to your door.</p>
      <button className="btn-get-started" onClick={onSignIn}>Get Started</button>
    </div>
    <div className="login-body">
      <p className="social-label" style={{ marginBottom: 16 }}>Sign in with</p>
      <div className="social-row" style={{ marginBottom: 16 }}>
        {['Facebook','Google','Twitter'].map(name => (
          <button key={name} className="social-btn" aria-label={name}>
            {name === 'Facebook' && <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
            {name === 'Google' && <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>}
            {name === 'Twitter' && <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>}
          </button>
        ))}
      </div>
      <p className="bottom-text">
        Don't have an account?{' '}
        <button className="link-orange" onClick={onSignUp}>Sign Up</button>
      </p>
    </div>
  </div>
)

// ── SCREEN 2 — Sign In ────────────────────────────────────────────────────────
const SignInScreen = ({ onSignUp, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!agreed) { setError('Please agree to the User Agreement and Privacy Policy.'); return }
    if (!form.email || !form.password) { setError('All fields are required.'); return }
    // Demo: accept any credentials
    onLoginSuccess({ email: form.email, name: form.email.split('@')[0] })
  }

  return (
    <div className="login-card">
      <div className="login-logo-header">
        <Logo variant="white" />
      </div>
      <div className="login-body">
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <div className="field-wrap">
              <input className="field-input" type="email" name="email"
                value={form.email} onChange={handleChange}
                placeholder="Enter your email address" required />
            </div>
          </div>

          <PasswordField label="Password" name="password"
            value={form.password} onChange={handleChange}
            placeholder="Enter your password" />

          <div className="forgot-row">
            <button type="button" className="link-orange">Forgot password</button>
          </div>

          <div className="check-row">
            <input type="checkbox" id="agree-signin" checked={agreed}
              onChange={e => setAgreed(e.target.checked)} />
            <label htmlFor="agree-signin" className="check-label">
              I read and agreed to{' '}
              <button type="button" className="link-orange">User Agreement</button>
              {' '}and{' '}
              <button type="button" className="link-orange">privacy policy</button>
            </label>
          </div>

          <button type="submit" className="btn-submit">Sign in</button>
        </form>

        <SocialButtons label="Sign in with" />

        <p className="bottom-text">
          Don't have an account?{' '}
          <button className="link-orange" onClick={onSignUp}>Sign Up</button>
        </p>
      </div>
    </div>
  )
}

// ── SCREEN 3 — Sign Up ────────────────────────────────────────────────────────
const SignUpScreen = ({ onSignIn, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!agreed) { setError('Please agree to the User Agreement and Privacy Policy.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    onLoginSuccess({ email: form.email, name: form.email.split('@')[0] })
  }

  return (
    <div className="login-card">
      <div style={{ background: '#f9f9f9', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 0' }}>
        <Logo variant="orange" />
      </div>
      <div className="login-body">
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <div className="field-wrap">
              <input className="field-input" type="email" name="email"
                value={form.email} onChange={handleChange}
                placeholder="Enter your email address" required />
            </div>
          </div>

          <PasswordField label="Password" name="password"
            value={form.password} onChange={handleChange}
            placeholder="Enter your password" />

          <PasswordField label="Confirm Password" name="confirm"
            value={form.confirm} onChange={handleChange}
            placeholder="Enter your password" />

          <div className="check-row">
            <input type="checkbox" id="agree-signup" checked={agreed}
              onChange={e => setAgreed(e.target.checked)} />
            <label htmlFor="agree-signup" className="check-label">
              I read and agreed to{' '}
              <button type="button" className="link-orange">User Agreement</button>
              {' '}and{' '}
              <button type="button" className="link-orange">privacy policy</button>
            </label>
          </div>

          <button type="submit" className="btn-submit">Sign up</button>
        </form>

        <SocialButtons label="Sign up with" />

        <p className="bottom-text">
          Already have an account?{' '}
          <button className="link-orange" onClick={onSignIn}>Sign In</button>
        </p>
      </div>
    </div>
  )
}

// ── Main Login Component ──────────────────────────────────────────────────────
export default function Login({ onLoginSuccess }) {
  // 'welcome' | 'signin' | 'signup'
  const [screen, setScreen] = useState('welcome')

  return (
    <div className="login-wrapper">
      {screen === 'welcome' && (
        <WelcomeScreen
          onSignIn={() => setScreen('signin')}
          onSignUp={() => setScreen('signup')}
        />
      )}
      {screen === 'signin' && (
        <SignInScreen
          onSignUp={() => setScreen('signup')}
          onLoginSuccess={onLoginSuccess}
        />
      )}
      {screen === 'signup' && (
        <SignUpScreen
          onSignIn={() => setScreen('signin')}
          onLoginSuccess={onLoginSuccess}
        />
      )}
    </div>
  )
}