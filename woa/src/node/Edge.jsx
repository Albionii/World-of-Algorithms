export default class Edge {
  constructor(node1, node2, weight = 1){
    this.node1 = node1;
    this.node2 = node2;
    this.weight = weight;

    this.node1.addEdge(this);
    this.node2.addEdge(this);
    
  }

  getOtherNode(node) {
    return node === this.node1 ? this.node2 : this.node1;
  }
}
