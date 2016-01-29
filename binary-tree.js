'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		if(this.root == null) {
			this.root = new Node(data,null,null);
			return;
		}

		var curNode = this.root;
		while(true) {
			if(curNode.data == data) {return;}
			else if(curNode.data < data) {
				if(!curNode.right) {
					curNode.right = new Node(data,null,null);
					return;
				} else {
					curNode = curNode.right;
					continue;
				}
			} else if(curNode.data > data) {
				if(!curNode.left) {
					curNode.left = new Node(data,null,null);
					return;
				} else {
					curNode = curNode.left;
					continue;
				}
			}
		}
	}

	contains(data) {
		if(!this.root) return false;

		var curNode = this.root;

		while(true) {
			if(curNode.data == data) return true;
			else if(curNode.data < data) {
				if(!curNode.right) {
					return false;
				} else {
					curNode = curNode.right;
					continue;
				}
			} else if(curNode.data > data) {
				if(!curNode.left) {
					return false;
				} else {
					curNode = curNode.left;
					continue;
				}
			}
		}
	}

	remove(data) {
		if(!this.contains(data)) return;
		if(!this.root.left && !this.root.right) {
			this.root = null;
			return;
		}

		var parent = null;
		var curNode = this.root;
		while(curNode.data != data) {
			if(!curNode) return;
			parent = curNode;
			if(data < curNode.data) {
				if(!curNode.left) return;
				curNode = curNode.left;
			} else if(data > curNode.data) {
				if(!curNode.right) return;
				curNode = curNode.right;
			}
		}

		//find subtree min and remove leaf
		var minData;
		var subtree;
		var subtreeParent = curNode;
		if(curNode.left && curNode.right) {
			if (curNode.left) {
				subtree = curNode.left;

				while (subtree.right) {
					subtreeParent = subtree;
					subtree = subtree.right;
				}
				minData = subtree.data;
				if (subtreeParent.data != curNode.data) subtreeParent.right = subtree.left;
				else subtreeParent.left = subtree.left;
			} else if (curNode.right) {
				subtree = curNode.right;

				while (subtree.left) {
					subtreeParent = subtree;
					subtree = subtree.left;
				}
				minData = subtree.data;
				if (subtreeParent.data != curNode.data) subtreeParent.left = subtree.right;
				else subtreeParent.right = subtree.right;
			}
		} else if(curNode.left) {
			subtree = curNode.left;

			if (parent) {
				if (parent.left && parent.left.data == data) parent.left = subtree;
				else if (parent.right && parent.right.data == data) parent.right = subtree;
			}
		} else if(curNode.right) {
			subtree = curNode.right;

			if (parent) {
				if (parent.left && parent.left.data == data) parent.left = subtree;
				else if (parent.right && parent.right.data == data) parent.right = subtree;
			}
		} else if (!curNode.left && !curNode.right) {
			if (parent) {
				if (parent.left && parent.left.data == data) parent.left = null;
				else if (parent.right && parent.right.data == data) parent.right = null;
			}
			return;
		}

		curNode.data = minData;

	}

	getArr(root) {
		var data = [];
		if(!root) return data;
		if(root.left){
			data = data.concat(this.getArr(root.left));
		}
		data.push(root.data);
		if(root.right){
			data = data.concat(this.getArr(root.right));
		}
		return data;
	}

	getInnerArr(root) {
		var data = [];
		if(!root) return data;
		data.push(root.data);
		if(root.left){
			data = data.concat(this.getArr(root.left));
		}
		if(root.right){
			data = data.concat(this.getArr(root.right));
		}
		return data;
	}

	size() {
		return this.getArr(this.root).length;
	}

	isEmpty() {
		return !this.root;
	}
}
