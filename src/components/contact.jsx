import React, { useState } from 'react';
import '../styles/contact.css';
import sm from '../assets/sm.jpg';

function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock function for sending the message (you would replace this with a real backend)
    try {
      const response = await sendMessage(formData);
      console.log('Message sent:', response);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Message could not be sent. Please try again later.');
    }
  };

  const sendMessage = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000); // Simulate a delay for sending
    });
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <div className="contact-details image-column">
          <img src={sm} className="contact-image" alt="Supermarket" />
        </div>
        <div className="contact-details text-column">
          <p>If you have any questions or feedback, please don't hesitate to get in touch with us using the information below:</p>
          <div className="contact-info">
            <div className="message-box">
              <h2>Contact Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="contact-details">
              <h2>Visit Us</h2>
              <p>ShopX</p>
              <p>123 Kumara Street</p>
              <p>Colombo 7, Sri Lanka</p>
            </div>
            <div className="contact-details">
              <h2>Contact Information</h2>
              <p><a href='mailto:yuhu7447@gmail.com'>Email: contact@ShopX.com</a></p>
              <p>Phone: +94 812 456 789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
