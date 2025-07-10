import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Ron Tang</h1>
                    <h2>Software Engineer</h2>
                    <p className="hero-description">
                        Bachelor of Engineering (Software) graduate from the University of Sydney with 
                        experience in full-stack development, machine learning, and data analysis.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/permucards" className="btn btn-primary">Try my card game!</Link>
                    </div>
                </div>
            </div>
            
            <div className="home-summary">
                <div className="summary-container">
                    <div className="summary-section">
                        <h3>Education</h3>
                        <p>Bachelor of Engineering (Software), University of Sydney (2020 - 2024)</p>
                    </div>
                    
                    <div className="summary-section">
                        <h3>Skills</h3>
                        <ul className="skills-highlight">
                            <li>Java, Python, C</li>
                            <li>Full-stack Development</li>
                            <li>Machine Learning</li>
                            <li>Data Structure & Algorithms</li>
                        </ul>
                    </div>
                    
                    <div className="summary-section">
                        <h3>Project</h3>
                        <p>Data-Driven Optimal Power Flow for Islanded Microgrids</p>
                        <Link to="/projects" className="link-more">See all projects</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home; 