// BST's are just a collection of nodes that are linked together
// let's start by making the 'atom' of a binary search tree, a Node
class Node {
    constructor(data, left, right) {
      this.data = data;
      this.left = left || null;
      this.right = right || null;
    }
  }
  
  class BinarySearchTree {
    constructor(root) {
      this.root = root || null;
    }
    
    
    insert(data) {
      let newNode = new Node(data);
      
      // if BST is empty, we want to make the new node the root
      if (this.root === null) {
        this.root = newNode;
      } else { // if BST is not empty, we want to find the right place to insert the node
        this.recursiveInsert(newNode, this.root);
      }
    }
    
    recursiveInsert(newNode, currentNode) {
      if (currentNode === null || newNode.data === currentNode.data) return; // BST's don't have duplicates
        if (newNode.data < currentNode.data) { // if newNode is smaller than current node we want to go to the left
          if (currentNode.left === null) {
            currentNode.left = newNode;
          } else {
            this.recursiveInsert(newNode, currentNode.left);
          }
        }
        if (newNode.data > currentNode.data) { // if newNode is larger than current node we want to go to the right
          if (currentNode.right === null) {
            currentNode.right = newNode;
          } else {
            this.recursiveInsert(newNode, currentNode.right);
          }
        }
    }
    
    search(data, node) { 
      // write a function that searches the binary tree and returns the node containing data
      // *HINT*: recursion is your friend here
      
      // if node is null, data was not found, return null
      if (node === null) {
        return null;
      }
      // continue code here, check left or right based on whether data is more or less than current node's data
      // YOUR CODE HERE... else if...
      if(node.data === data){//if node data equal to the search data
            return node;//return the node
      }else if(node.data > data){//if node data is bigger than search data
            return this.search(data, node.left);//search the node on the left
      }else{//if node data is less than search data
            return this.search(data, node.right);//search the node on the right
      }

    }
    
    getSortedArray() {
      // write a function that converts our BST into a sorted array
      // return the array
      // example: if our bst looks like this:
      //         5
      //       /   \
      //     3       7
      //   /   \
      //  1     4
      // this.getSortedArray() will return
      // [1, 3, 4, 5, 7];
        let array = [];//array to store values
        function searching(node){
            if(node !== null){//if node is not null
                searching(node.left);//look through the left (lower value)
                array.push(node.data);//push node value in
                searching(node.right);//look through the right(higher value)
            }
        }
        searching(this.root);
        return array;
    }
    
    remove(data) {
      // write a function that does the opposite of insert
      // find the node with data (if it exists) and remove it from the tree
        function deleteNode(dataToDelete, node){
            
        }
        this.root = deleteNode(data, this.node);
    }
  }
  
  let root = new Node(5);
  let bst = new BinarySearchTree(root);
  
  bst.insert(3);
  bst.insert(7);
  bst.insert(1);
  bst.insert(4);
  console.log(bst);
  console.log(bst.search(3,root));
  console.log(bst.getSortedArray());
  bst.remove(4);
  console.log(bst);
  
  // The above code makes the following tree
  //         5
  //       /   \
  //     3       7
  //   /   \
  //  1     4