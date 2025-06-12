import React from 'react';
import SkillsSection from '../components/SkillsSection';

const Skills = () => {
    const skills = [
        'Proficient in Java, Python. Solid experience in C',
        'In-depth knowledge in Object-Oriented Programming and Agile development',
        'Proficient in testing and debugging',
        'Solid data structure and algorithm practice',
        'Strong operating system knowledge',
        'Proficient in full-stack development',
        'Strong knowledge of Linux environment',
        'Proficient in Machine Learning'
    ];

    const skillCategories = {
        programming: ['Java', 'Python', 'C', 'JavaScript', 'HTML/CSS'],
        frameworks: ['React', 'Express', 'Node.js'],
        databases: ['MongoDB', 'SQL'],
        tools: ['Git', 'Linux', 'Docker'],
        concepts: ['Object-Oriented Programming', 'Agile Development', 'Data Structures', 'Algorithms'],
        ml: ['Machine Learning', 'Reinforcement Learning', 'Data Analysis']
    };

    return (
        <div className="skills-page">
            <div className="skills-header">
                <h1>Skills</h1>
                <p>Here's an overview of my technical skills and competencies.</p>
            </div>
            
            <div className="skills-overview">
                <SkillsSection skills={skills} />
            </div>
            
            <div className="skills-categories">
                <h2>Skills by Category</h2>
                
                <div className="category-section">
                    <h3>Programming Languages</h3>
                    <div className="skill-tags">
                        {skillCategories.programming.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
                
                <div className="category-section">
                    <h3>Frameworks & Libraries</h3>
                    <div className="skill-tags">
                        {skillCategories.frameworks.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
                
                <div className="category-section">
                    <h3>Databases</h3>
                    <div className="skill-tags">
                        {skillCategories.databases.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
                
                <div className="category-section">
                    <h3>Tools & Platforms</h3>
                    <div className="skill-tags">
                        {skillCategories.tools.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
                
                <div className="category-section">
                    <h3>Concepts & Methodologies</h3>
                    <div className="skill-tags">
                        {skillCategories.concepts.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
                
                <div className="category-section">
                    <h3>Machine Learning & Data</h3>
                    <div className="skill-tags">
                        {skillCategories.ml.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills; 