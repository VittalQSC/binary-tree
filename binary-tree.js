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

	}

	remove(data) {

	}

	size() {

	}

	isEmpty() {

	}
}
