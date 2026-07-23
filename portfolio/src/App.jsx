import React, { useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import './App.css'

export default function App() {
  const [view, setView] = useState(() => {
    // initial view: prefer hash, then localStorage, then default
    const hash = (window.location.hash || '').replace('#', '')
    if (hash) return hash
    try {
      const saved = localStorage.getItem('view')
      if (saved) return saved
    } catch (e) {}
    return 'home'
  })

  const [visible, setVisible] = useState(true)
  const TRANSITION_MS = 260

  function navigateTo(target) {
    if (target === view) return
    // animate out, then switch view
    setVisible(false)
    setTimeout(() => {
      setView(target)
      try {
        localStorage.setItem('view', target)
      } catch (e) {}
      // update hash so the view is shareable
      try {
        window.history.replaceState(null, '', '#' + target)
      } catch (e) {}
      // animate in
      setTimeout(() => setVisible(true), 20)
    }, TRANSITION_MS)
  }

  function renderView() {
    switch (view) {
      case 'home':
        return <Home onNavigate={navigateTo} />
      case 'about':
        return <About onNavigate={navigateTo} />
      case 'blog':
        return <Blog />
      case 'contact':
        return <Contact />
      default:
        return <Home onNavigate={navigateTo} />
    }
  }

  // focus management: move focus to the page heading when view changes
  React.useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById('page-heading')
      if (el) el.focus()
    }, TRANSITION_MS + 10)
    return () => clearTimeout(t)
  }, [view])

  return (
    <div className="app-shell">
      <Navbar expand="lg" className="shadow-sm app-navbar" role="navigation" aria-label="Main" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="fw-bold" tabIndex={0}>Gabriele Trainiti</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" role="menubar">
              <Nav.Link role="menuitem" aria-current={view === 'home' ? 'page' : undefined} active={view === 'home'} onClick={() => navigateTo('home')}>Home</Nav.Link>
              <Nav.Link role="menuitem" aria-current={view === 'about' ? 'page' : undefined} active={view === 'about'} onClick={() => navigateTo('about')}>About</Nav.Link>
              <Nav.Link role="menuitem" aria-current={view === 'blog' ? 'page' : undefined} active={view === 'blog'} onClick={() => navigateTo('blog')}>Blog</Nav.Link>
              <Nav.Link role="menuitem" aria-current={view === 'contact' ? 'page' : undefined} active={view === 'contact'} onClick={() => navigateTo('contact')}>Contact me</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <div className={`page-view ${visible ? 'visible' : ''}`} role="main" id="main-content">
          {renderView()}
        </div>
      </main>

      <footer className="py-4 text-center app-footer">
        <Container>
          <small>© {new Date().getFullYear()} Gabriele Trainiti - Cybersecurity Expert and Designer. All rights reserved.</small>
        </Container>
      </footer>
    </div>
  )
}


