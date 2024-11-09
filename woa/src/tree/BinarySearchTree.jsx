import React, { useState, useEffect } from 'react';
import Node from '../node/Node';

class BST {
  constructor() {
    this.root = null;
    this.temporaryRoot = null;
    this.array = [];
  }

  insert(node) {
    if (this.root === null) {
      this.root = node;
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (node.label < currentNode.label) {
        if (currentNode.left === null) {
          currentNode.left = node;
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = node;
          break;
        }
        currentNode = currentNode.right;
      }
    }
  }

  insertArray(array) {
    this.array = array;
    for (const value of array) {
      this.insert(value);
    }
    // for (const value of array) {
    //   console.log("Node " + value.label + " : " + "left :" + (value.left !== null ? value.left.label:"none") + " , " + (value.right !== null ? value.right.label:"none"));
    // }
    return this.root;
  }
}

export default function BinarySearchTree() {
  const [numberArray, setNumberArray] = useState('');
  const [array, setArray] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [scale, setScale] = useState(1);

  let depth = 1;

  const handleNumberArray = (event) => {
    const value = event.target.value;
    const filterValue = value.replace(/[^0-9,]/g, '');
    setNumberArray(filterValue);
    setArray(filterValue.split(',').filter((v) => v !== ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bst = new BST();
    const root = bst.insertArray(nodes); 
    depth = maxDepth(root);
    calculateNodePositions(root);
  };

  const updateNodePositions = (pos, index) => {
    if (index != null ){
      setNodes((prevNodes) =>
        prevNodes.map((node,i) =>
          i === index ? node.changePosition(pos.x, pos.y) : node
        )
      );
    }
  }

  const maxDepth = (node) => {
    if (node === null) {
      return 0;
    }
    const leftDepth = maxDepth(node.left);
    const rightDepth = maxDepth(node.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  const calculateNodePositions = (node, yDepth=0, x=window.innerWidth / 2, spread=50) => {
    if (!node) return;
    const index = nodes.findIndex(n => n == node);
    updateNodePositions({x:x,y:100+yDepth*80},index);
  
    const xSpread = spread * Math.pow(2,depth - (yDepth+2));
    
    if (x - xSpread < 0) {
    } 
  
    if (node.left) calculateNodePositions(node.left, yDepth + 1, x - xSpread);
    if (node.right) calculateNodePositions(node.right, yDepth + 1, x + xSpread);
    
  }

  const ifNodeOutOfScreen = (node, spread) => {

  }

  const handleScroll = (e) => {
    setScale((prevScale) => {
      const newScale = e.deltaY < 0 ? prevScale + 0.1 : prevScale - 0.1;
      return Math.max(0.1, Math.min(newScale, 3));
    });
  }

  useEffect(() => {
    const newNodes = array.map((number, index) => {
      return new Node(2 * (index + 1) * Node.size, 30, Number(number));
    });
    setNodes(newNodes);
  }, [array]);

  return (
    <div className='bg-white h-screen flex flex-col items-center overflow-hidden'onWheel={handleScroll}>
      <div className='bg-black flex justify-center items-center py-6 w-full z-10'>
        <form onSubmit={handleSubmit}>
          <span className='text-white'>Shkruani vlerat : </span>
          <input
            type="text"
            pattern="^([0-9,])*$"
            className='bg-slate-400 rounded border hover:border-blue-400'
            value={numberArray}
            onChange={handleNumberArray}
          />
        </form>
      </div>
      <div 
        className="relative bg-white h-full w-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 0.2s ease',
        }}
        >
        
        {nodes.map((node, index) => Node.drawNodeLine(node, index))}
      </div>
    </div>
  );
}
