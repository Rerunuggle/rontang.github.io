import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import PermuCards from './pages/PermuCards';

function App() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const basename = process.env.NODE_ENV === 'production' ? '/rontang.github.io' : '';

  // Set default collapsed state based on screen width on initial load
  useEffect(() => {
    const handleResize = () => {
      // Default to collapsed for screens larger than 992px
      if (window.innerWidth > 992) {
        setNavbarCollapsed(true);
      } else {
        setNavbarCollapsed(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <Router basename={basename}>
      <div className="App">
        <NavBar navbarCollapsed={navbarCollapsed} setNavbarCollapsed={setNavbarCollapsed} />
        <div className={`main-content ${navbarCollapsed ? 'collapsed' : ''}`}>
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/permucards" element={<PermuCards />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;