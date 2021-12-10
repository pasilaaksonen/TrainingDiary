import React from 'react';

import '../styles.css';
import git from '../images/25231.svg';

const Footer = () => {

    return (
        <div className="footer">
            <h4 className='footerText'>
                Back-End Development project by Pasi Laaksonen, Albert Puustinen, Samuel Jumppanen, Yolanda Theodorakis
            </h4>
            <a href="https://github.com/pasilaaksonen/TrainingDiary">
                <img src={git} alt="" width="3%" 
                style={{backgroundColor: "grey", marginTop: "15px"}}>
                </img>
            </a>
        </div>
    )
}

export default Footer;
