import React, { createContext, useState, useEffect } from 'react';
import buildTree from '../utils/buildTree';
import loadData from '../utils/loadData';

const TreeContext = createContext();

const TreeProvider = ({ children }) => {
  
  const [tree, setTree] = useState([]);
  const [treeView, setTreeView] = useState([]);
  const [company, setCompany] = useState('');

  useEffect(() => {
      async function fetchTree() {
          try {
              const treeData = buildTree(await loadData());
              setTree(treeData);
              setTreeView(treeData[0].children);
              setCompany(treeData[0].name);
          } catch (error) {
              console.log(error);
          }
      }

      fetchTree();
  }, []);

  return (
    <TreeContext.Provider value={{ tree, treeView, setTreeView, company, setCompany }}>
      {children}
    </TreeContext.Provider>
  );
};

export { TreeContext, TreeProvider };