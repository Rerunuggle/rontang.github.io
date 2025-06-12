import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-header">
                <h1>Contact Me</h1>
                <p>Feel free to reach out to me for any inquiries or opportunities.</p>
            </div>
            
            <div className="contact-content">
                <div className="contact-info">
                    <div className="contact-method">
                        <h3>Email</h3>
                        <p>ronge1135783290@gmail.com</p>
                    </div>
                    
                    <div className="contact-method">
                        <h3>Phone</h3>
                        <p>+61 452 433 081</p>
                    </div>
                    
                    <div className="contact-method">
                        <h3>Location</h3>
                        <p>Sydney, Australia</p>
                    </div>
                </div>
                
                <div className="contact-form-section">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default Contact; 