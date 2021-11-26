import React from 'react';

import '../styles.css';
import rope from '../images/rope.jpg';
import row from '../images/row.jpg';
import weights from '../images/weights.jpg';

const Etusivu = () => {

    return (
        <div>
            <h1 class='welcomeText'>
                TERVETULOA TREENIPÄIVÄKIRJAAN!
            </h1>
            
            <div class='imgContainer'>
                <img src={rope} alt='rope' class='img' />
                <img src={weights} alt='weights' class='img' />
                <img src={row} alt='row' class='img' />
            </div>

            <h6 class='bottomText'>
                Back-End Development project by Pasi Laaksonen, Albert Puustinen, Samuel Jumppanen, Yolanda Theodorakis
            </h6>
        </div>
    )
}

export default Etusivu;
