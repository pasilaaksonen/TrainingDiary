import React, { useState } from 'react';
import weights from '../images/weight2.jpg';

const Etusivu = () => {
//
    return (
        <div>
            <h1>
                 TREENIPÄIVÄKIRJA
            </h1>
            <h6>
                Harjoitus 4, created by Pasi Laaksonen
            </h6>
            <img src={weights} alt="weights" />
        </div>
    )
}

export default Etusivu