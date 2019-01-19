// Implement a Graph
// basic operations:
//  - add vertex (node)
//  - add edge (node -> node)


class GraphNode {
  constructor(val) {
    this.val = val;
    this.edges = {};
  }
}

class Graph {
  constructor() {
    this.vertices = {};
  }

  // O(1) operation
  addVertex(val) {
    // add vertex only if it does not exist.
    if (!this.vertices[val]) {
      this.vertices[val] = new GraphNode(val);
    }
  }

  // O(E) operation - edges
  removeVertex(val) {
    if (this.vertices[val]) {
      delete this.vertices[val];

      // once you remove a vertex, you need to remove all edges pointing
      // to the vertex.
      Object.keys(this.vertices).forEach(function(key, index) {
        if (this.vertices[key].edges[val]) {
          delete this.vertices[key].edges[val];
        }
      }.bind(this));
    }
  }

  // O(1) operation
  getVertex(val) {
    return this.vertices[val];
  };

  // O(1) operation
  addEdge(start, end) {
    // check to see if vertices exists.
    // if it exists, set the edges and be done.
    if (this.vertices[start] && this.vertices[end]) {

      // check to see if edge exists, if it does, increment it's weight
      if (this.vertices[start].edges[end]) {
        this.vertices[start].edges[end].weight += 1;
      } else {

        // edge does not exist, set weight to 1.
        this.vertices[start].edges[end] = { weight: 1 };
      }
    }
  }

  // O(1) operation
  removeEdge(start, end) {
    if (this.vertices[start] && this.vertices[end]) {
      if (this.vertices[start].edges[end]) {
        delete this.vertices[start].edges[end];
      }
    }
  }

  // O(1) operation
  getEdge(start, end) {
    return this.vertices[start].edges[end] || null;
  };

  neighbors(val) {
    return this.vertices[val] ? this.vertices[val].edges : null;
  };
}

module.exports = Graph











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
