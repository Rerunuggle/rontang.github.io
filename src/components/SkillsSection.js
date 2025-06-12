import React from 'react';

const SkillsSection = ({ skills }) => {
    return (
        <div className="skills-section">
            <h2>Skills</h2>
            <div className="skills-container">
                <ul className="skills-list">
                    {skills.map((skill, index) => (
                        <li key={index} className="skill-item">{skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SkillsSection; 