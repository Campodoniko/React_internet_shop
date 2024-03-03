import React from 'react';
import './Footer.css'
import map from '../assets/map.png'

const Footer = () => {
  return (
    <>
    <h1 className='title'>Contact</h1>
    <footer>
      <div className='cards'><h3>Phone</h3> +7(499)350-66-04</div>
      <div className='cards'><h3>Social</h3><a href="http://www.facebook.com">...</a></div>
      <div className='cards'><h3>Address</h3>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</div>
      <div className='cards'><h3>Working Hours</h3>24 hours a day</div>
      <div className='map'><img src={map} alt='map'></img></div>
    </footer>
    </>
  );
};

export default Footer;