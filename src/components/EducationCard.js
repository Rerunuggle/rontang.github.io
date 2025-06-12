import React from 'react';

const EducationCard = ({ period, institution, degree }) => {
    return (
        <div className="education-card">
            <div className="education-period">{period}</div>
            <div className="education-details">
                <h3>{degree}</h3>
                <p>{institution}</p>
            </div>
        </div>
    );
};

export default EducationCard; 