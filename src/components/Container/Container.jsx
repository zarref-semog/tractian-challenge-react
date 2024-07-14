import React from 'react';
import AssetTree from '../AssetTree/AssetTree';
import AssetDetails from '../AssetDetails/AssetDetails';
import './Container.css';
import FilterButton from '../FilterButton/FilterButton';

function Container() {
    return (
        <div className='container'>
            <div className='container-header'>
                <h2>Ativos</h2>
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