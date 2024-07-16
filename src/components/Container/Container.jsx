import React, { useContext } from 'react';
import AssetTree from '../AssetTree/AssetTree';
import AssetDetails from '../AssetDetails/AssetDetails';
import './Container.css';
import FilterButton from '../FilterButton/FilterButton';
import { TreeContext } from '../../provider/TreeProvider';

function Container() {
    const { company } = useContext(TreeContext);

    return (
        <div className='container'>
            <div className='container-header'>
                <h2>Ativos<span id='company-name'>/{company} Unit</span></h2>
                <div>
                    <FilterButton />
                    <FilterButton />
                </div>
            </div>
            <div className='content'>
                <AssetTree />
                <AssetDetails />
            </div>
        </div>
    );
}

export default Container;