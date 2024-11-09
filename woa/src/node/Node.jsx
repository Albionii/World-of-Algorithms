import React from "react";
export default class Node {
  static size = 35;
  constructor(x, y, label){
    this.x = x;
    this.y = y;
    this.label = label;
    this.edges = [];
    this.left = null;
    this.right = null;
  }

  leftNode(value){
    this.left = value;
  }

  rightNode(value){
    this.right = value;
  }

  addEdge(edge){
    this.edges.push(edge); 
  }

  changePosition(x, y){
    this.x = x;
    this.y = y;
    return this;
  }

  getConnectedNodes(){
    return this.edges.map(edge => edge.getOtherNode(this));
  }



  static drawNode(node, index, handleEdge, handleMouseDown){
    return (
      <div 
          onClick={()=>handleEdge(node)}
          onMouseDown={() => handleMouseDown(index)}
          key={index} 
          className='bg-blue-600 rounded-full absolute flex justify-center items-center select-none'         
          style={{
            width:Node.size,
            height:Node.size,
            top: node.y-Node.size/2,
            left:node.x-Node.size/2,
            cursor:"grab"
          }}
      >
            {node.label}
      </div>
    )    
  }

  static drawNodeLine(node, index){
    return (
      <div 
          key={index} 
          className='bg-blue-600 rounded-full absolute flex justify-center items-center select-none'         
          style={{
            width:Node.size,
            height:Node.size,
            top: node.y-Node.size/2,
            left:node.x-Node.size/2,
            transition: "transform 1s ease, top 1s ease, left 1s ease"
          }}
      >
            {node.label}
      </div>
    )    
  }


}
