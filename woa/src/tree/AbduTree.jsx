import React, { useEffect, useRef, useState } from 'react'
import {Graph,shortestPath } from 'graph-data-structure';

function AbduTree() {
  const [positions, setPositions] = useState([]);
  const [hookVertice, setHookVertice] = useState({ isHooked: false, vertice: -1 });
  const [edges, setEdges] = useState([]);


  const handlePositions = (event) => {
    setPositions([
      ...positions,
      { x: event.clientX, y: event.clientY }
    ]);
    console.log(positions);
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
      });
      const shortestPathR = shortestPath(g,parseInt(values[0]),parseInt(values[1]))
      alert("Nodes : "+shortestPathR.nodes + " Weight: " + shortestPathR.weight);
      


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
      <div className="container w-screen h-svh bg-transparent" onClick={handlePositions}>
        {/* <div className='w-10 border-2 border-violet-950 rounded-full h-10'></div> */}
        {
          positions.map((position, index) => (
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevents bubbling
                clickVertice(index);
              }}
              key={index}
              style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                zIndex: 2,
                backgroundColor: hookVertice.vertice == index ? "black" : "white",
              }}
              className='w-10 border-2 border-violet-950 rounded-full h-10 flex items-center justify-center content-center text-center'
            >


              <p className=' hover:text-inherit'>{index}</p>
            </div>
          ))
        }
        <svg style={{
          height: '100%',
          width: '100%',
        }}>

          {edges.map((edge, index) => {
            const startX = positions[edge.from].x + 20;
            const startY = positions[edge.from].y + 20;
            const endX = positions[edge.to].x + 20;
            const endY = positions[edge.to].y + 20;

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
                  stroke="black"
                />
                {/* Display text in the middle of the line */}
                <text x={midX} y={midY} textAnchor="middle" fill="black" fontSize="12" onClick={(e) => {
                  e.stopPropagation(); // Prevents bubbling
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
