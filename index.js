const createNode = (data) => {
  return {
    data: data,
    left: null,
    right: null,
  };
};

const Tree = (arr) => {
  function sortingNum(a, b) {
    return a - b;
  }
  function removeDuplicates(arr) {
    let seen = {};
    let result = [];
    let j = 0;
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (seen[item] !== 1) {
        seen[item] = 1;
        result[j++] = item;
      }
    }
    return result;
  }

  let sorted = arr.sort(sortingNum);
  let reduced = removeDuplicates(sorted);

  function buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let node = createNode(arr[mid]);
    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    return node;
  }
  let root = buildTree(reduced, 0, reduced.length - 1);

  const InsertTree = (root, value) => {
    let node = createNode(value);
    if (!root) {
      root = node;
      return;
    }
    let prev = null;
    let temp = root;
    while (temp) {
      if (temp.data > value) {
        prev = temp;
        temp = temp.left;
      } else if (temp.data < value) {
        prev = temp;
        temp = temp.right;
      }
    }
    if (prev.data > value) {
      prev.left = node;
    } else {
      prev.right = node;
    }
  };
  function deleteVal(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.data) {
      root.left = deleteVal(root.left, value);
    } else if (value > root.data) {
      root.right = deleteVal(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
    }
    root.data = minValue(root.right);
    root.right = deleteVal(root.value);
    return root;
  }

  function minValue(root) {
    let minVal = root.data;
    while (root.left != null) {
      minVal = root.left.data;
      root = root.left;
    }
    return minVal;
  }

  function find(root, value) {
    if (root === null) return root;
    if (root.data > value) {
      return find(root.left, value);
    } else if (root.data < value) {
      return find(root.right, value);
    } else {
      return root;
    }
  }
  function levelOrder(root, fun) {
    let result = [];
    let q = [root];
    let node;

    while (q.length >= 1) {
      for (let i = 0; i < q.length; i++) {
        node = q.shift();
        if (node) {
          if (fun) {
            fun(node);
          } else {
            result.push(node.data);
          }
          q.push(node.left);
          q.push(node.right);
        }
      }
    }
    if (!fun) {
      return result;
    }
  }

  const PreOrder = (root, fun) => {
    if (root) {
      if (fun) {
        fun(root);
        if (root.left) PreOrder(root.left, fun);
        if (root.right) PreOrder(root.right, fun);
      } else {
        if (root == null) return;

        let result = [root.data]
          .concat(PreOrder(root.left))
          .concat(PreOrder(root.right));
        result = result.filter(function (element) {
          return element !== undefined;
        });

        return result;
      }
    }
  };

  function InOrder(root, fun) {
    if (root) {
      if (fun) {
        if (root.left) PreOrder(root.left, fun);
        fun(root);
        if (root.right) PreOrder(root.right, fun);
      } else {
        if (root == null) return;
        let result = [root.date]
          .concat(InOrder(root.left))
          .concat(root.data)
          .concat(InOrder(root.right));
        result = result.filter(function (element) {
          return element !== undefined;
        });
        return result;
      }
    }
  }
  function PostOrder(root, fun) {
    if (root) {
      if (fun) {
        if (root.left) PostOrder(root.left, fun);
        if (root.right) PostOrder(root.right, fun);
        fun(root);
      } else {
        if (root == null) return;
        let result = [root.date]
          .concat(PreOrder(root.left))
          .concat(PreOrder(root.right))
          .concat(root.data);
        result = result.filter(function (element) {
          return element !== undefined;
        });
        return result;
      }
    }
  }
  function height(root) {
    if (root == null) return -1;
    let leftHight = height(root.left);
    let rightHight = height(root.right);
    return Math.max(leftHight, rightHight) + 1;
  }
  function depth(root, node) {
    if (root == null) return;
    let nodeDepth = 0;
    let current = root;
    while (current) {
      if (current.data > node.data) {
        nodeDepth++;
        current = current.left;
      } else if (current.data < node.date) {
        nodeDepth++;
        current = current.right;
      } else if (current.data == node.date) {
        return nodeDepth;
      } else {
        return "Node could not be found.";
      }
    }
  }
  const isBalanced = (root) => {
    if (root == null) return -1;
    let leftHight = height(root.left);
    let rightHight = height(root.right);
    leftHight = leftHight + 1;
    rightHight = rightHight + 1;
    let div = leftHight - rightHight;
    if (div > 1 || div < -1) {
      return false;
    } else {
      isBalanced(root.left);
      isBalanced(root.right);
    }
    return true;
  };
  function reBalance(root) {
    let arr = InOrder(root);
    return Tree(arr);
  }
  return {
    root,
    buildTree,
    InsertTree,
    deleteVal,
    minValue,
    find,
    levelOrder,
    PreOrder,
    InOrder,
    PostOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
let test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(test);
test = Tree(test);
console.log(prettyPrint(test.root));
console.log(test.isBalanced(test.root));
console.log(test.levelOrder(test.root));
console.log(test.PreOrder(test.root));
console.log(test.PostOrder(test.root));
console.log(test.InOrder(test.root));
test.InsertTree(test.root, 200);
test.InsertTree(test.root, 300);
test.InsertTree(test.root, 400);
prettyPrint(test.root);
console.log(test.isBalanced(test.root));
test = test.reBalance(test.root);
prettyPrint(test.root);
console.log(test.isBalanced(test.root));
console.log(test.levelOrder(test.root));
console.log(test.PreOrder(test.root));
console.log(test.PostOrder(test.root));
console.log(test.InOrder(test.root));
