// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide name, email, and message' });
        }
        
        // In a real application, you would:
        // 1. Save to database
        // 2. Send an email notification
        // 3. Set up email autoresponder
        
        // For now, we'll just log the submission and return success
        console.log('Contact form submission:', {
            name,
            email,
            subject,
            message,
            date: new Date()
        });
        
        res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Error in contact form submission:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    submitContactForm,
}; 