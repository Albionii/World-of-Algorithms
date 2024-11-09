import { useState } from 'react';
import Node from '../node/Node';
import WeightPopup from './WeightPopUp';


const Graph = ({graphData, handleEdge, handleMouseDown, mousePos}) => {
  const {nodes, edges, index, previousNode, isDrawing} = graphData;
  const [popupData, setPopupData] = useState(null);

  const handleWeightClick = (edge, midX, midY) => {
    setPopupData({ edge, x: midX, y: midY });
  };

  const handleWeightSave = (newWeight) => {
    if (popupData) {
      popupData.edge.weight = parseInt(newWeight, 10);
      setPopupData(null);
    }
  };

  const generateGraph = () => {
    return(
      nodes.map((node, index)=>(
        Node.drawNode(node,index, handleEdge, handleMouseDown)
      ))
    )
  }

  /**
   * Displays all the edges that are already connected to nodes
   * 
   * and their corresponding weights.
   * @returns The Edges connected to Nodes
   */
  const renderEdges = () =>{
    return edges.map((edge, index) => {
      const node1 = nodes.find(node => node === edge.node1); 
      const node2 = nodes.find(node => node === edge.node2);

      const midX = (node1.x + node2.x) / 2;
      const midY = (node1.y + node2.y) / 2;
  
      return (
        <g
          key={index}
        >

          <line
            x1={node1.x}
            y1={node1.y}
            x2={node2.x}
            y2={node2.y}
            stroke="black"
            strokeWidth="2"
          />
          <circle cx={midX} cy={midY} r={10} fill="white" />
          <text
              x={midX}
              y={midY}
              textAnchor="middle"
              dy=".35em"
              fontSize="12"
              fill="black"
              style={{cursor:"pointer", userSelect:"none"}}
              onClick={() => handleWeightClick(edge, midX, midY)}
            >
             {edge.weight} 
            </text>
        </g>
      );
    });
  };


  /**
   * Creates a line that has one point to a node and one following
   * 
   * the mouse position.
   * @returns {JSX.Element|null} The Edge that is currently being drawn.
   */
  const edgeDrawing = () => {

    return (
      isDrawing && 
        (
          <line
          key={index}
          x1={mousePos.x}
          y1={mousePos.y}
          x2={previousNode.x}
          y2={previousNode.y}
          stroke="black"
          strokeWidth="2"
        />
      )
    )
  }


  

  return(
    <>
      <svg className="absolute top-0 left-0 w-full h-full">  
        {renderEdges()}
        {edgeDrawing()}
      </svg>
      {generateGraph()}
      {popupData && (
        <WeightPopup
          x={popupData.x}
          y={popupData.y}
          initialWeight={popupData.edge.weight}
          onSave={handleWeightSave}
          onClose={() => setPopupData(null)}
        />
      )}
    </>
  )
}


export default Graph;