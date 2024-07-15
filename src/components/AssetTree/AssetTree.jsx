import React, { useContext, useState } from 'react';
import './AssetTree.css';
import { BsSearch } from 'react-icons/bs';
import { TreeContext } from '../../provider/TreeProvider';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Location from '../../assets/images/location.png';
import Asset from '../../assets/images/asset.png';
import Component from '../../assets/images/component.png';

function TreeNode({ node }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const renderIcon = (imageType) => {
        switch(imageType) {
            case 'location':
                return <img src={Location} alt='location' width='24px'/>;
            case 'asset':
                return <img src={Asset} alt='asset' width='24px' />;
            case 'component':
                return <img src={Component} alt='component' width='24px' />;
            default:
                return null;
        }
    };

    return (
        <div className='tree-node'>
            {(node.children.length !== 0) ? (
                <button onClick={toggle} className='toggle-icon'>
                    {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </button>
            ) : <>&nbsp;&nbsp;&nbsp;&nbsp;</>}
            {renderIcon(node.image)}
            <span>&nbsp; {node.name}</span>
            {isOpen && <TreeView data={node?.children} />}
        </div>
    );
}

function TreeView({ data }) {
    return (
        <div>
            {data.map((node) => <TreeNode key={node.id} node={node} />)}
        </div>
    );
}

function AssetTree() {

    const { treeView } = useContext(TreeContext);

    return (
        <div className='asset-tree'>
            <div className='search'>
                <input type='search' placeholder='Buscar Ativo ou Local' />
                <BsSearch />
            </div>
            <hr />
            <div className='tree-view'>
                <TreeView data={treeView} />
            </div>

        </div>
    );
}

export default AssetTree;