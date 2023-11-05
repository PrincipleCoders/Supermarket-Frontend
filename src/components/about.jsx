import React from 'react'
import smkt from '../assets/smkt.jpg'
import '../styles/about.css'
import { Container } from '@mui/material';

function About() {
  const image1 = smkt; 
  const name = "super market"

  return (
    <div>
      <img src={image1} className='item-image' alt={name} />
      <div>
        <h1>Welcome to <b>ShopX</b></h1>
        <div>
          <p className='main-content'>
            
            ShopX is proudly Sri Lankan, owned and operated over the last 25 years, delivering the freshest quality products, along with great value, serving thousands of Sri Lankans every day.

            As a subsidiary of the John Keells Group, ShopX operates 116 supermarkets; 109 of which are fully owned, and 6 franchise outlets operating under the 'Super K' brand. Operating with the core purpose of improving the quality of life for the nation, the supermarkets are conveniently located across the country, providing our shoppers with a world-class retail experience.

            With a passion for food, particularly fresh food, our team of over 4500 people are at the heart of our success as we strive to provide our customers with an enjoyable shopping experience and our stakeholders with long-lasting partnerships. With over 7 collection centers in strategic locations, ShopX sources fresh produce from farmers and ensures this produce reaches the stores in 24 hours, delivering on the promise of freshness. Our SLSI certified bakeries at the store provide oven-fresh bread and bakery products, and our Good Manufacturing Practices (GMP) certified hot kitchens provide the busy customers of today with food to go.

            Our ever-growing own label product portfolio includes over 335 products, and ShopX also carries a varied range of products exclusively sourced and sold at our supermarkets, providing discerning customers a range of choices. Being the first supermarket to launch an online shopping platform providing customers with the facility of home delivery and click and collect, ShopX also operates with state-of-the-art systems to ensure the operations run smoothly, providing consistent access to products customers need. The Nexus loyalty program with over 1.3 million memberships provides customers with great deals and ways to save while shopping and earn points on top of that.

            ShopX was also the first retailer in Sri Lanka to commit to reduce by 50%, single-use polythene bags and in-store prepared food packaging by the year 2025, ensuring that as the business grows, the impact on the environment is minimized, and sustainable practices are employed. Over 57 of our stores also use solar power, relying more on renewable sources of energy as another initiative towards being sustainable.
          </p>
        </div>
        <div>
          <h2>
            Recognized for our efforts
          </h2>
          <div>
            <p className='sub-content'>
              <ul>
                <li>Sri Lankan Heritage: ShopX is a proudly Sri Lankan supermarket with a 25-year legacy of delivering high-quality products and excellent value to our fellow Sri Lankans.</li>
                <li>Part of John Keells Group: As a subsidiary of the renowned John Keells Group, ShopX operates a network of 116 supermarkets, including 6 franchise outlets under the 'Super K' brand.</li>
                <li>Our Mission: We are on a mission to enhance the quality of life for the nation by providing conveniently located supermarkets that offer a world-class retail experience.</li>
                <li>Passionate Team: Our team of over 4500 dedicated individuals shares a profound passion for fresh food, and they are at the core of our success, ensuring delightful shopping experiences for our customers.</li>
                <li>ShopX Loyalty Program: ShopX takes shopping to the next level with the Nexus loyalty program. With over 1.3 million members, it offers great deals, savings, and the opportunity to earn points on every purchase.</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
