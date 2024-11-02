import React from "react";
export default class Node {
  static size = 35;
  constructor(x, y, label){
    this.x = x;
    this.y = y;
    this.label = label;
    this.edges = [];
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
          }}
      >
            {node.label}
      </div>
    )    
  }

}
