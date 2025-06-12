import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Experience = () => {
    const experiences = [
        {
            title: 'Researcher',
            organization: 'University of Sydney - Advanced Analytics and Planning',
            period: 'Aug 2023 – Oct 2023',
            description: [
                'Collaborated with a diverse team to design and implement a predictive model for identifying future Clarivate Highly Cited Researchers with agile methodologies.',
                'Applied and evaluated multiple supervised learning algorithms, including Random Forest, Gradient Boosting, Support Vector Machine, and Decision Tree classifiers.',
                'Took primary responsibility for data preprocessing, outlier detection, and pruning to elevate model reliability and performance.',
                'Tuned hyperparameters and optimised the Gradient Boosting model to maximise predictive performance.',
                'Achieved a final model accuracy of 87%.'
            ]
        },
        {
            title: 'Full-Stack Developer',
            organization: 'Jacaranda Flame Consulting – University of Sydney, School of Veterinary Science',
            period: 'Jun 2024 – Jul 2024',
            description: [
                'Collaborated with a multidisciplinary team to enhance a canine auscultation training model for the School of Veterinary Science with agile methodologies.',
                'Contributed to full-stack development, including a USYD-branded website for project presentation, application distribution, and website deployment on GitHub.',
                'Implemented Bluetooth communication protocols to communicate with custom hardware, including an Arduino R4 Wi-Fi board and bone conduction speakers.',
                'Delivered a functional and affordable canine model with 90% lower cost.'
            ]
        },
        {
            title: 'Thesis Researcher',
            organization: 'University of Sydney',
            period: 'Mar 2024 – Nov 2024',
            description: [
                'Conducted a thesis project focused on developing a data-driven approach to Optimal Power Flow in islanded microgrids.',
                'Applied advanced reinforcement learning algorithms including MACPO (Multi-Agent Constrained Policy Optimisation) and SAC (Soft Actor-Critic).',
                'Demonstrated significant performance and computational efficiency compared to traditional OPF solutions.',
                'Gained concrete experience in the implementation, tuning, and deployment of machine learning algorithms in power systems.',
                'Acquired proficiency in cross-domain integration of ML methods into real-world engineering problem.'
            ]
        }
    ];

    return (
        <div className="experience-page">
            <div className="experience-header">
                <h1>Experience</h1>
                <p>My professional and research experience in software engineering and data science.</p>
            </div>
            
            <div className="experience-timeline">
                {experiences.map((experience, index) => (
                    <ProjectCard 
                        key={index}
                        title={experience.title}
                        organization={experience.organization}
                        period={experience.period}
                        description={experience.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Experience; 