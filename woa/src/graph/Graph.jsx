import Node from '../node/Node';

const Graph = ({graphData, handleEdge, handleMouseDown, mousePos}) => {
  const {nodes, edges, index, previousNode, isDrawing} = graphData;


  
  const generateGraph = () => {
    return(
      nodes.map((node, index)=>(
        Node.drawNode(node,index, handleEdge, handleMouseDown)
      ))
    )
  }

  const renderEdges = () =>{
    return edges.map((edge, index) => {
      const node1 = nodes.find(node => node === edge.node1); 
      const node2 = nodes.find(node => node === edge.node2);
  
      return (
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
  };

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
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">  
        {renderEdges()}
        {edgeDrawing()}
      </svg>
      {generateGraph()}
    </>
  )
}


export default Graph;