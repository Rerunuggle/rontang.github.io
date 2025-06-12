import React from 'react';

const Footer = () => {
    return (
        <footer className="footer" style={{ width: '100%' }}>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Zhongyuan Tang. All Rights Reserved.</p>
                <div className="footer-contact">
                    <p>M: +61 452 433 081 | E: ronge1135783290@gmail.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 