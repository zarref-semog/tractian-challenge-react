import React from 'react';
import './CompanyButton.css';
import Vector from '../../assets/images/vector.svg';

function CompanyButton() {
    return(
        <button><img src={Vector} alt='icone' width='14px'/>Company</button>
    );
}

export default CompanyButton;