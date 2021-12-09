import React from 'react';

import '../styles.css';
import rope from '../images/rope.jpg';
import row from '../images/row.jpg';
import weights from '../images/weights.jpg';

import Footer from './Footer'

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
         
            <Footer></Footer>
        </div>
    )
}

export default Etusivu;
