import React, { useEffect } from 'react';
import './AssetTree.css';
import { BsSearch } from 'react-icons/bs';
import buildTree from '../../utils/buildTree';
import loadData from '../../utils/loadData';

function AssetTree() {
    // const [tree, setTree] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTree() {
            try {
                const treeData = buildTree(await loadData());
                // setTree(treeData);
                // setLoading(false);
                console.log(treeData);
            } catch (error) {
                // setError(error);
                // setLoading(false);
            }
        }

        fetchTree();
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <div className='asset-tree'>
            <div className='search'>
                <input type='search' placeholder='Buscar Ativo ou Local' />
                <BsSearch />
            </div>
            <hr />
        </div>
    );
}

export default AssetTree;
