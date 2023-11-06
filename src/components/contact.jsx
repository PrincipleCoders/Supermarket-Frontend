import React from 'react';
import '../styles/contact.css';
import sm from '../assets/sm.jpg';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';

function ContactUs() {
  const image = sm;

  return (
    <div className="contact-us-container">
      <h1 className="mtopic">Contact Us</h1>
      <p>
        If you have any questions, feedback, or inquiries, please feel free to
        get in touch with us. We value your input and are here to assist you in
        any way we can. Our dedicated team is eager to provide you with the best
        possible support. Reach out to us via email, phone, or by visiting our
        physical location. We look forward to hearing from you and serving your
        needs.
      </p>
      <img src={image} className="contact-image" />
      <div className="contact-info">
        <div className="contact-details">
          <h2>
          <AddHomeWorkIcon /> Visit Us
          </h2>
          <p>ShopX</p>
          <p>123 Kumara Street</p>
          <p>Colombo 7, Sri Lanka</p>
        </div>

        <div className="contact-details">
          <h2>
            Contact Information
          </h2>
          <p>
            <EmailIcon/><a href="yuhu7447@gmail.com">Email: contact@ShopX.com</a>
          </p>
          <p><ContactPhoneIcon/>Phone: +94 812 456 789</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
