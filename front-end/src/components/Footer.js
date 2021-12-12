import React from 'react';

import '../styles.css';
import git from '../images/25231.svg';

const Footer = () => {

    return (
        <div className='footer'>
            <h6 className='footerText'>
                Back-End Development project by Pasi Laaksonen, Albert Puustinen, Samuel Jumppanen, Yolanda Theodorakis
            </h6>
            <a href='https://github.com/pasilaaksonen/TrainingDiary'>
                <img src={git} alt='github' width='25em' style={{backgroundColor: 'grey'}} />
            </a>
        </div>
    )
}

export default Footer;
