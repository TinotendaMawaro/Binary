const Node = (data) => {
    return {data: data, left: null, right: null};
}

export const Tree = (_arr = []) => {

    const _initArr = (arr) => {
        let uniq = [...new Set(arr)];
        return uniq.sort((a,b) => a-b);
    }
    
    const _buildTree = (arr) => {
        let rootIndex = Math.floor((arr.length-1) / 2);
        let tempRoot = Node(arr[rootIndex]);
        
        if (arr.length <= 1) {
            return tempRoot;
        } else if (arr.length === 2) {
            tempRoot.right = Node(arr[1]);
            return tempRoot;
        } else {
            tempRoot.right = _buildTree(arr.slice(rootIndex + 1, arr.length));
            tempRoot.left = _buildTree(arr.slice(0, rootIndex));
        }
        
        return tempRoot;
    }
    
    _arr = _initArr(_arr);
    let root = _buildTree(_arr); //initialize BST

    let preOrderData = []; //initialize storage for traversal methods
    let inOrderData = [];
    let postOrderData = [];

    const insertNode = (data, tempRoot = root) => {
        if (data >= tempRoot.data) {
            if (!tempRoot.right) {
                tempRoot.right = Node(data);
                return;
            }
            insertNode(data, tempRoot.right);
        } else {
            if (!tempRoot.left) {
                tempRoot.left = Node(data);
                return;
            }
            insertNode(data, tempRoot.left);
        }
    }

    const findMin = (tempRoot) => { //used to find "in order successor"
        let min = tempRoot.data;
        while (tempRoot.left) {
            min = tempRoot.left.data;
            tempRoot = tempRoot.left;
        }
        return min;
    }

    const deleteNode = (data, tempRoot = root) => {
        if (!tempRoot) return tempRoot; //base case if data isn't in tree

        if (data > tempRoot.data) {
            tempRoot.right = deleteNode(data, tempRoot.right);
        } else if (data < tempRoot.data) {
            tempRoot.left = deleteNode(data, tempRoot.left);
        } else {
            if (!tempRoot.left) return tempRoot.right; //could return null if node has no children
            if (!tempRoot.right) return tempRoot.left;

            tempRoot.data = findMin(tempRoot.right);
            tempRoot.right = deleteNode(tempRoot.data, tempRoot.right);
        }

        return tempRoot;
    }

    const find = (data) => {
        let tempRoot = root;
        while (tempRoot) {
            if (tempRoot.data === data) return tempRoot;
            if (data > tempRoot.data) tempRoot = tempRoot.right;
            if (data < tempRoot.data) tempRoot = tempRoot.left;
        }
        return 'node does not exist';
    }

    const levelOrder = () => {
        let tempRoot = root;
        let queue = [tempRoot];
        let list = [];

        while (queue.length > 0) {
            if (queue[0].left) queue.push(queue[0].left);
            if (queue[0].right) queue.push(queue[0].right);

            list.push(queue.shift().data);
        }

        return list;
    }

    const preOrder = (tempRoot = root) => {
        if (tempRoot == root) preOrderData = [];
        preOrderData.push(tempRoot.data);
        if (tempRoot.left) preOrder(tempRoot.left);
        if (tempRoot.right) preOrder(tempRoot.right);
        return preOrderData;
    }

    const inOrder = (tempRoot = root) => {
        if (tempRoot == root) inOrderData = [];
        if (tempRoot.left) inOrder(tempRoot.left);
        inOrderData.push(tempRoot.data);
        if (tempRoot.right) inOrder(tempRoot.right);
        return inOrderData;
    }

    const postOrder = (tempRoot = root) => {
        if (tempRoot == root) postOrderData = [];
        if (tempRoot.left) postOrder(tempRoot.left);
        if (tempRoot.right) postOrder(tempRoot.right);
        postOrderData.push(tempRoot.data);
        return postOrderData;
    }

    const height = (node = root) => {
        let heightLeft = 0;
        let heightRight = 0;

        if (node.left) heightLeft += 1 + height(node.left);
        if (node.right) heightRight += 1 + height(node.right);
        return Math.max(heightLeft, heightRight);
    }

    const depth = (node = root) => {
        let data = node.data;
        let tempRoot = root;
        let depth = 0;
        while (tempRoot) {
            if (tempRoot.data == data) return depth;
            if (data > tempRoot.data) {
                depth++;
                tempRoot = tempRoot.right;
            }
            if (data < tempRoot.data) {
                depth++;
                tempRoot = tempRoot.left;
            }
        }
        return 'node does not exist in current tree';
    }

    const isBalanced = () => Math.abs(height(root.right) - height(root.left)) <= 1;

    const rebalance = () => {
        _arr = _initArr(inOrder());
        root = _buildTree(_arr);
        console.log('rebalanced!');
    }

    const prettyPrint = (node = root, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }

    return {root, insertNode, deleteNode, find, levelOrder, preOrder, inOrder, postOrder, height, depth, isBalanced, rebalance, prettyPrint};
}