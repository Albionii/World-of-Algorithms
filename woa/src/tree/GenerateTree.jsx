import React, { useState } from 'react'
import Node from '../node/Node';
import Edge from '../node/Edge';
import Graph from '../graph/Graph';

export default function GenerateTree() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [index, setIndex] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mousePos, setMousePos] = useState({x:0, y:0});
  const [previousNode, setPreviousNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [disableClick, setDisableClick] = useState(true);
  

  const mousePosition = (e) => {
    const x = e.clientX;
    const y = e.clientY-2*Node.size;
    setMousePos({x:x, y:y});
    return {x, y};
  }

  const updateNodePositions = (pos) => {
    if (index != null ){
      setNodes((prevNodes) =>
        prevNodes.map((node, i) =>
          i === index ? node.changePosition(pos.x, pos.y) : node
        )
      );
    }
  }

  const handleDoubleClick = (e) => {
    const pos = mousePosition(e);
    setNodes([...nodes, new Node(pos.x, pos.y, nodes.length + 1)])
  }

  const handleMouseDown = (nodeIndex) => {
    setIndex(nodeIndex);
    setIsDragging(true);
  }
  
  const handleMouseMove = (e) => {
    const pos = mousePosition(e);
    if (isDragging){
      setIsDrawing(false);
      setDisableClick(false);
    }
    updateNodePositions(pos);
  }

  const handleMouseUp = ()=>{
    setIndex(null);
    setIsDragging(false);
  }

  
  const handleEdge = (node) => {
    if(disableClick){
      if (isDrawing == false) {
        setIsDrawing(true);
        setPreviousNode(node);
      }
      else {
        setIsDrawing(false);
        if(previousNode != node) {
          const newEdge = new Edge(previousNode, node,1);
          setEdges([...edges, newEdge]);
        }
      }
    }
    setDisableClick(true);
  }

  const handleKey = (e) => {
    nodes.map((node) => (
      console.log(node.label + " : " + node.getConnectedNodes())
    ))
  }



  return (
    <div className='bg-neutral-800 h-screen flex flex-col items-center'>
      <div className='flex justify-center items-center py-6'>
        <span className='text-white'>Shkruani vlerat : </span>
        <input type="text" className='bg-slate-400 rounded border hover:border-blue-400'/>
      </div>
      <div 
        tabIndex="0"
        onKeyDown={handleKey}
        onDoubleClick={handleDoubleClick} 
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative bg-white border h-full w-full">
        
        <Graph 
          graphData = {{nodes, edges, isDrawing, previousNode, index}}
          handleEdge={handleEdge} 
          handleMouseDown={handleMouseDown} 
          mousePos={mousePos}
        />

      </div>
    </div>
  )
}
