import React, { useState, useEffect } from 'react';
import Node from '../node/Node';
import Edge from '../node/Edge';

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
        continue;
      } else{
        if (currentNode.right === null) {
          currentNode.right = node;
          break;
        }
        currentNode = currentNode.right; //TODO: Qetu eshte gabimi qe vlera e 2 del si node.right
        continue;
      }

    }
  }

  insertArray(array) {
    this.array = array;
    for (const value of array) {
      value.left = null;
      value.right = null;
      this.insert(value);
    }
    return this.root;
  }
}

export default function BinarySearchTree() {
  const [numberArray, setNumberArray] = useState('');
  const [array, setArray] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [scale, setScale] = useState(1);
  
  let depth = 1;
  let edgeArray = [];
  let spread = 50;

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const handleNumberArray = (event) => {
    const value = event.target.value;
    const filterValue = value.replace(/[^0-9,]/g, '');
    setNumberArray(filterValue);
    setArray(filterValue.split(',').filter((v) => v !== ''));
  };
  
 const handleSubmit = async(e) => {
    e.preventDefault();
    const bst = new BST();
    const root = bst.insertArray(nodes)
    depth = maxDepth(root);
    findNodeOutOfBounds(root);
    calculateNodePositions(root);
    await delay(1000);
    setEdges(edgeArray);
    
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

  const findNodeOutOfBounds = (node, yDepth=0, x=window.innerWidth / 2, spreadd=50) => {
    if (!node) return;

    const minSpread = 5;

    while (((spreadd >= minSpread)) && ((x - spreadd * Math.pow(2, depth - (yDepth + 2)) < 0) || 
    (x + spreadd * Math.pow(2, depth - (yDepth + 2)) > window.innerWidth))) {
      spreadd -= 2;
    }
    let xSpread = spreadd * Math.pow(2,depth - (yDepth+2));
    spread = spreadd;
     
    if (node.left) findNodeOutOfBounds(node.left, yDepth + 1, x - xSpread, spreadd)
    if (node.right) findNodeOutOfBounds(node.right, yDepth + 1, x + xSpread, spreadd);
  }

  const calculateNodePositions = (node, yDepth=0, x=window.innerWidth / 2) => {
    if (!node) return;
    const index = nodes.findIndex(n => n == node);
    updateNodePositions({x:x,y:100+yDepth*80},index);
  
    const xSpread = spread * Math.pow(2,depth - (yDepth+2));

    if (node.left) {
      const newEdge = new Edge(node, node.left, 1);
      edgeArray.push(newEdge);
      calculateNodePositions(node.left, yDepth + 1, x - xSpread);
      
    }
    if (node.right) {
      const newEdge = new Edge(node, node.right, 1);
      edgeArray.push(newEdge);
      calculateNodePositions(node.right, yDepth + 1, x + xSpread);
    }
    
  }
  

  /**
   * Used to change the scale size of a div on mouse scroll
   * @param {MouseEvent} e 
   */
  const handleScroll = (e) => {
    setScale((prevScale) => {
      const newScale = e.deltaY < 0 ? prevScale + 0.1 : prevScale - 0.1;
      return Math.max(0.1, Math.min(newScale, 3));
    });
  }

  const drawEdges = () => {
    return edges.length > 0 && edges.map((edge, index) => {
      const node1 = nodes.find(node => node === edge.node1); 
      const node2 = nodes.find(node => node === edge.node2);

      return (!(node1 == undefined || node2 == undefined) &&
          <line
            key={index}
            x1={node1.x}
            y1={node1.y}
            x2={node2.x}
            y2={node2.y}
            stroke="black"
            strokeWidth="2"
            />
      );
    });
  }

  useEffect(() => {
    const newNodes = array.map((number, index) => {
      return new Node(2 * (index + 1) * Node.size, 30, Number(number));
    });
    setNodes(newNodes);
    setEdges([]);
  }, [array]);

  return (
    <div className='bg-white h-screen flex flex-col items-center overflow-hidden'>
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
        className="relative bg-white h-full w-full border"
        // style={{
        //   transform: `scale(${scale})`,
        //   transformOrigin: 'center',
        //   transition: 'transform 0.2s ease',
        // }}
        >
        
        <svg className="absolute top-0 left-0 w-full h-full">{drawEdges()}</svg>
        {nodes.map((node, index) => Node.drawNodeLine(node, index))}
      </div>
    </div>
  );
}
