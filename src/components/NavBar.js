import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaCode, FaCogs, FaGamepad, FaEnvelope } from 'react-icons/fa';
import profileImage from '../assets/images/me.jpg';

const NavBar = ({ navbarCollapsed, setNavbarCollapsed }) => {
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    
    // Handle mouse enter/leave events
    const handleMouseEnter = () => {
        setIsHovered(true);
        if (navbarCollapsed) {
            setNavbarCollapsed(false);
        }
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!navbarCollapsed) {
            setNavbarCollapsed(true);
        }
    };
    
    // Set initial collapse state based on screen width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setNavbarCollapsed(true);
            }
        };
        
        // Set initial state
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, [setNavbarCollapsed]);

    // Check if current path matches the link path
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav 
            className={`navbar vertical collapsible ${navbarCollapsed && !isHovered ? 'collapsed' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="navbar-container vertical">
                <div className="profile-image-container">
                    <Link to="/">
                        <img 
                            src={profileImage} 
                            alt="Ron Tang" 
                            className="profile-image" 
                        />
                    </Link>
                </div>
                <ul className={`nav-menu vertical ${!navbarCollapsed || isHovered ? 'active' : ''}`} style={{ 
                    textAlign: navbarCollapsed && !isHovered ? 'center' : 'left'
                }}>
                    <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                        <Link to="/" className="nav-link">
                            <FaHome className="nav-icon" />
                            <span className="nav-text">Home</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
                        <Link to="/about" className="nav-link">
                            <FaUser className="nav-icon" />
                            <span className="nav-text">About</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/experience') ? 'active' : ''}`}>
                        <Link to="/experience" className="nav-link">
                            <FaBriefcase className="nav-icon" />
                            <span className="nav-text">Experience</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
                        <Link to="/projects" className="nav-link">
                            <FaCode className="nav-icon" />
                            <span className="nav-text">Projects</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/skills') ? 'active' : ''}`}>
                        <Link to="/skills" className="nav-link">
                            <FaCogs className="nav-icon" />
                            <span className="nav-text">Skills</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/permucards') ? 'active' : ''}`}>
                        <Link to="/permucards" className="nav-link">
                            <FaGamepad className="nav-icon" />
                            <span className="nav-text">PermuCards</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>
                        <Link to="/contact" className="nav-link">
                            <FaEnvelope className="nav-icon" />
                            <span className="nav-text">Contact</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;