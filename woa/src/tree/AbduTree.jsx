import React, { useEffect, useRef, useState } from 'react'
import {Graph,shortestPath } from 'graph-data-structure';

function AbduTree() {
  const [positions, setPositions] = useState([]);
  const [hookVertice, setHookVertice] = useState({ isHooked: false, vertice: -1 });
  const [edges, setEdges] = useState([]);
  const[answer,setAnswer] = useState("");
  const[nodeFunctions,setNodeFunctions] = useState(null);
  const[id,setId] = useState(0);

  const handleNodeFunctions = (position) => {
    setNodeFunctions(position);
    console.log(nodeFunctions);
  }
  const handleNodeEvents = (event) =>{
    if(nodeFunctions != null){
        if(event.key === 'q'){
          const updatedEdges = edges.filter(edge => edge.from !== nodeFunctions.id && edge.to !== nodeFunctions.id);
          setEdges(updatedEdges);
          const updatedVertices = positions.filter(position => position.id !== nodeFunctions.id);
          setPositions(updatedVertices);


        }
      setNodeFunctions(null);

    }
  }


  const handlePositions = (event) => {
    setPositions([
      ...positions,
      {id:id, x: event.clientX, y: event.clientY }
    ]);
    setId(id + 1);
  }
  const clickVertice = (vertice) => {
    if (!hookVertice.isHooked) {
      setHookVertice({ isHooked: true, vertice: vertice });
    }
    if (hookVertice.isHooked) {
      const edgeExists = edges.some(edge =>
        (edge.from === hookVertice.vertice && edge.to === vertice) ||
        (edge.from === vertice && edge.to === hookVertice.vertice));

      if ((hookVertice.vertice === vertice)) {
        setHookVertice({ isHooked: false, vertice: -1 });
        return;
      }

      if (!edgeExists) {
        setEdges([
          ...edges,
          { from: hookVertice.vertice, to: vertice, dis: 1 }
        ]);
        setHookVertice({ isHooked: false, vertice: -1 });
      } else {
        alert("ARLEADY EXISTS");
      }
    }
    console.log(edges);
  }
  const changeDis = (index) => {
    const updatedEdges = edges;
    updatedEdges[index] = { ...updatedEdges[index], dis: updatedEdges[index].dis + 1 };
    setEdges(updatedEdges);

  }
  const handleSP = (e) => {
    // console.log(e.target.value);
    const values = e.target.value.split(',');
    if (isNaN(parseInt(values[0])) || isNaN(parseInt(values[1]))) {
      return;
    }

    const exists = edges.some(edge =>
      (edge.from == values[0] || edge.to == values[0]) 
    );
    const otherExist = edges.some(edge =>(
      (edge.from == values[1] || edge.to == values[1]) 

    ));
    if (exists && otherExist) {
      const g = new Graph();
      positions.forEach((position, index) => {
        g.addNode(index);
      });
      edges.forEach((edge) => {
        // g.addEdge(new Graph.Edge(edge.from, edge.to, edge.dis));
        g.addEdge(parseInt(edge.from), parseInt(edge.to), { weight: parseInt(edge.dis) });
        g.addEdge(parseInt(edge.to), parseInt(edge.from), { weight: parseInt(edge.dis) });
      });
      const shortestPathR = shortestPath(g,parseInt(values[0]),parseInt(values[1]))
      setAnswer("Path : "+shortestPathR.nodes + " Total Weight: " + shortestPathR.weight);
      


    }else{
      setAnswer(" ");
    }
  }
  return (
    <>
      <div style={{
        position: 'fixed',
      }} className='flex items-center justify-center align-middle w-screen'>
        <label for="fname">Find path from to:</label>
        <input type="text" id="fname" name="fname" placeholder='example:3,2' onChange={(e) => handleSP(e)} />
      </div>
      <div style={{
        position: 'fixed',
      }} className='flex items-center justify-end align-middle'>
        <h3>{answer}</h3>
      </div>
      
      <div className="w-screen h-screen bg-slate-700" onClick={handlePositions} tabIndex={0} onKeyDown={handleNodeEvents}>
        {/* <div className='w-10 border-2 border-violet-950 rounded-full h-10'></div> */}
        {
          positions.map((position, index) => (
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevents bubbling
                clickVertice(position.id);
              }}
              onMouseOver={(e)=>{
                e.stopPropagation(); // Prevents bubbling
                handleNodeFunctions(position)}
              }
              onMouseLeave={(e)=> {e.stopPropagation();
                handleNodeFunctions(null)}}
              key={index}
              style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                zIndex: 2,
                backgroundColor: hookVertice.vertice == position.id ? "black" : "white",
              }}
              className='w-10 border-2 border-violet-950 rounded-full h-10 flex items-center justify-center content-center text-center'
            >


              <p className=' hover:text-inherit'>{position.id}</p>
            </div>
          ))
        }
        <svg style={{
          height: '100%',
          width: '100%',
        }}>

          {edges.map((edge, index) => {
            const fromIndex = positions.find(pos => pos.id === edge.from);
            const toIndex = positions.find(pos => pos.id === edge.to);
            const startX = fromIndex.x + 20;
            const startY = fromIndex.y + 20;
            const endX = toIndex.x + 20;
            const endY = toIndex.y + 20;

            // Calculate midpoint for the text position
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;

            return (
              <g key={index}>
                {/* Draw the line */}
                <line
                  id={index}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="grey"
                />
                {/* Display text in the middle of the line */}
                <text x={midX} y={midY} textAnchor="middle" fill="black" fontSize="12" onClick={(e) => {
                  e.stopPropagation(); 
                  setPositions([...positions]);
                  changeDis(index);
                }}>
                  {edge.dis}
                </text>
              </g>
            );
          })}


        </svg>

      </div>

    </>
  )
}

export default AbduTree
