import {Tree} from "./script.js";

const randomArr = (n) => {
    let arr = [];
    for (let i=0; i<n; i++) {
        arr.push(Math.ceil(Math.random()*100));
    }
    return arr;
}

let tree = Tree(randomArr(20));

console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

for (let i=0; i<200; i++) {
    tree.insertNode(Math.ceil(Math.random()*100));
}

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

tree.prettyPrint();