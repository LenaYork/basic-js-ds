const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions

*/

class Node {
  constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
  }
}


class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = node;
      return;
    }

    let currentNode = this.rootNode;
    let parentNode = null;

    while (currentNode !== null) {
      parentNode = currentNode;

      if (node.data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (node.data < parentNode.data) {
      parentNode.left = node;
    } else {
      parentNode.right = node;
    }
  }

  has(data) {
    let currentNode = this.rootNode;

    while (currentNode !== null) {
      if (data === currentNode.data) {
        return true;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode !== null) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(data) {
    const removeNode = function(node, data) {
      if (node === null) {
        return null;
      }

      if (data === node.data) {
        // node has no children 
        if (node.left === null && node.right === null) {
          return null;
        }

        // node has no left child 
        if (node.left === null) {
          return node.right;
        }

        // node has no right child 
        if (node.right === null) {
          return node.left;
        }

        // node has two children 
        let tmpNode = node.right;
        while (tmpNode.left !== null) {
          tmpNode = tmpNode.left;
        }

        node.data = tmpNode.data;
        node.right = removeNode(node.right, tmpNode.data);

        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };

    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};