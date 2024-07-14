import React from 'react';
import './Header.css';
import Logo from '../../assets/images/logo.png';
import CompanyButton from '../CompanyButton/CompanyButton';

function Header() {
    return (
        <div className='header'>
            <div className='logo'>
                <img className='logo' src={Logo} alt='logo' />
            </div>
            <div className='buttons'>
                <CompanyButton />
                <CompanyButton />
                <CompanyButton />
            </div>
        </div>
    );
}

export default Header;