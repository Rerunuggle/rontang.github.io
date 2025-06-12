import React from 'react';
import EducationCard from '../components/EducationCard';

const About = () => {
    const education = [
        {
            period: '2020 – 2024',
            institution: 'University of Sydney',
            degree: 'Bachelor of Engineering (Software)'
        },
        {
            period: '2017 – 2019',
            institution: 'Bonnyrigg High School, Sydney',
            degree: 'High School Education'
        }
    ];

    return (
        <div className="about-page">
            <div className="about-header">
                <h1>About Me</h1>
                <div className="about-intro">
                    <p>
                        I am a recent Software Engineering graduate from the University of Sydney with a passion 
                        for developing innovative solutions to complex problems. My academic journey has equipped me 
                        with strong technical skills and practical experience in various areas of software development.
                    </p>
                </div>
            </div>

            <div className="education-section">
                <h2>Education</h2>
                <div className="education-list">
                    {education.map((edu, index) => (
                        <EducationCard 
                            key={index}
                            period={edu.period}
                            institution={edu.institution}
                            degree={edu.degree}
                        />
                    ))}
                </div>
            </div>

            <div className="personal-interests">
                <h2>Professional Interests</h2>
                <ul>
                    <li>Machine Learning and Artificial Intelligence</li>
                    <li>Full-stack Web Development</li>
                    <li>Data Analysis and Visualization</li>
                    <li>Software Architecture and Design</li>
                </ul>
            </div>
        </div>
    );
};

export default About; 