import React from 'react';
import '../styles/contact.css';
// import smkt from '../assets/sm.jpg'


function ContactUs() {
    const image = sm;
  return (
    <div className="contact-us-container">

      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, please don't hesitate to get in touch with us using the information below:</p>
      <div className="contact-info">
        <div className="contact-details">
          <h2>Visit Us</h2>
          <p>ShopX</p>
          <p>123 Kumara Street</p>
          <p>Colombo 7, Sri Lanka</p>
        </div>

        <div className="contact-details">
          <h2>Contact Information</h2>
          <p><a href='yuhu7447@gmail.com'>Email: contact@ShopX.com</a></p>
          <p>Phone: +94 812 456 789</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
