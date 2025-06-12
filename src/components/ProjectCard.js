import React from 'react';

const ProjectCard = ({ title, organization, period, description }) => {
    return (
        <div className="project-card">
            <div className="project-header">
                <h3>{title}</h3>
                <p className="organization">{organization}</p>
                <p className="period">{period}</p>
            </div>
            <div className="project-description">
                <ul>
                    {description.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectCard; 