import React from 'react';

import '../styles.css';
import rope from '../images/rope.jpg';
import row from '../images/row.jpg';
import weights from '../images/weights.jpg';

const Etusivu = () => {

    return (
        <div>
            <h1 className='welcomeText'>
                TERVETULOA TREENIPÄIVÄKIRJAAN!
            </h1>
            
            <div className='imgContainer'>
                <img src={rope} alt='rope' className='img' />
                <img src={weights} alt='weights' className='img' />
                <img src={row} alt='row' className='img' />
            </div>
        </div>
    )
}

export default Etusivu;
