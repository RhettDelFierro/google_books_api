class GraphNode {
  constructor(val) {
    this.val = val;
    this.edges = {};
  }
}

export class Graph {
  constructor() {
    this.vertices = {};
  }

  addVertex(val) {
    if (!this.vertices[val]) {
      this.vertices[val] = new GraphNode(val);
    }
  }

  removeVertex(val) {
    if (this.vertices[val]) {
      delete this.vertices[val];

      Object.keys(this.vertices).forEach(function(key, index) {
        if (this.vertices[key].edges[val]) {
          delete this.vertices[key].edges[val];
        }
      }.bind(this));
    }
  }

  getVertex(val) {
    return this.vertices[val];
  };

  addEdge(start, end) {
    if (this.vertices[start] && this.vertices[end]) {

      if (this.vertices[start].edges[end]) {
        this.vertices[start].edges[end].weight += 1;
      } else {
        this.vertices[start].edges[end] = { weight: 1 };
      }
    }
  }

  removeEdge(start, end) {
    if (this.vertices[start] && this.vertices[end]) {
      if (this.vertices[start].edges[end]) {
        delete this.vertices[start].edges[end];
      }
    }
  }

  getEdge(start, end) {
    return this.vertices[start].edges[end] || null;
  };

  neighbors(val) {
    return this.vertices[val] ? this.vertices[val].edges : null;
  };
}











// var graph = new Graph();
// graph.addVertex(5);
// graph.addVertex(2);
// graph.addVertex(6);
// graph.addVertex(7);
// graph.addVertex(8);
// graph.addEdge(2, 5);
// graph.addEdge(6, 7);
// graph.addEdge(6, 8);
// graph.addEdge(7, 5);
// console.log(graph.getEdge(2, 5));
// console.log(graph.getEdge(6, 7));
// graph.removeVertex(5);
// console.log(graph.getEdge(2, 5));
// console.log(graph)
// console.log(graph.neighbors(6));
// console.log(graph.neighbors(5));
