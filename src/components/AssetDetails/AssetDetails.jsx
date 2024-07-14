import React from 'react';
import './AssetDetails.css';
import Asset from '../../assets/images/electric-motor-Va7vAQ3-600.jpg';

function AssetDetails() {
    return (
        <div className='asset-details'>
            <div className='title'>
                <h3>MOTOR RT COAL AF01</h3>
                <hr />
            </div>
            <div className='asset-data'>
                <img src={Asset} alt='asset' />
                <div className='asset-side-info'>
                    <p><strong>Tipo de Equipamento</strong></p>
                    <p className='asset-text'>Motor Elétrico (Trifásico)</p>
                    <hr />
                    <p><strong>Responsáveis</strong></p>
                    <p className='asset-text'>Elétrica</p>
                </div>
            </div>
            <hr />
            <div className='asset-bottom-info'>
                <div>
                    <p><strong>Sensor</strong></p>
                    <p className='asset-text'>HIO4510</p>
                </div>
                <div>
                    <p><strong>Receptor</strong></p>
                    <p className='asset-text'>EUH4R27</p>
                </div>
            </div>
        </div>
    );
}

export default AssetDetails;