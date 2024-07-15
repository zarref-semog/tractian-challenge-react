import React from 'react';
import './CompanyButton.css';
import Vector from '../../assets/images/vector.svg';

function CompanyButton({ name, action }) {
    return(
        <button className='company-button' onClick={action}><img src={Vector} alt='icone' width='14px'/>{name}</button>
    );
}

export default CompanyButton;