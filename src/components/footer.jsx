import React from "react";
import '../styles/footer.css'
import fb from '../assets/social/facebook.png'
import insta from '../assets/social/instagram.png'
import twitter from '../assets/social/twitter.png'
import yt from '../assets/social/youtube.png'

export default function Footer() {
    return (
        <>
            <footer>
                <div className="footer-logo">
                    <span className="footer-logo-text">shop<span className="x">X</span></span> <br />
                    <span className="footer-logo-tagline">Stock Up on Happiness</span>
                </div>

                <span className="more-info-head">More Info</span> <br />
                <span className="more-info-links">
                    Address : <br />
                    No.25, <br />
                    Matale RD, <br />
                    Kandy, Sri Lanka.<br /> <br />

                    Email : <a href="mailto:shopX@gmail.com">shopX@gmail.com</a> <br />
                    Contact No : +94 8197569
                </span>

                <span className="find-us-head">Find Us on</span> <br />
                <div className="find-us-links">
                    <a href="https://www.facebook.com/">
                        <img src={fb} alt="fb" className="social-icon" />
                    </a>
                    <a href="https://www.twitter.com/">
                        <img src={twitter} alt="twitter" className="social-icon" />
                    </a>
                    <a href="https://www.youtube.com/">
                        <img src={yt} alt="yt" className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com/">
                        <img src={insta} alt="instagram" className="social-icon" />
                    </a>
                </div>

                <span className="footer-about-head">About us</span> <br />
                <span className="footer-about-txt">
                ShopX, your trusted neighborhood supermarket, has been serving our community for generations. With a focus on quality and convenience, we're here to make your shopping experience enjoyable and your meals memorable. Explore the finest groceries and discover the difference at ShopX.
                </span>
            </footer>
            <div className="copyright">
                © Copyright <b>shopX</b>. All Rights Reserved
            </div>
        </>
    );
};




