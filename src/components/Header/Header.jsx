import React, { useContext } from 'react';
import './Header.css';
import Logo from '../../assets/images/logo.png';
import CompanyButton from '../CompanyButton/CompanyButton';
import { TreeContext } from '../../provider/TreeProvider';


function Header() {
    const { tree, setTreeView } = useContext(TreeContext);

    return (
        <div className='header'>
            <div className='logo'>
                <img className='logo' src={Logo} alt='logo' />
            </div>
            <div className='buttons'>
                {tree.map((node) => <CompanyButton key={node.id} name={node.name} action={() => setTreeView(node.children)}/>)}
            </div>
        </div>
    );
}

export default Header;