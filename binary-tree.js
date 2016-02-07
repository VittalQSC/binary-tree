'use strict';

class BinaryTree {
    constructor() {
        this.root = null;
    }

    static getSide(data, nodeData) {
        if (data == nodeData)
            return undefined;
        if (data < nodeData)
            return 'left';
        if (data > nodeData)
            return 'right';
    }

    insert(data) {
        if (this.root == null) {
            this.root = new Node(data, null, null);
            return;
        }

        var curNode = this.root;
        var side;
        while (true) {
            side = BinaryTree.getSide(data, curNode.data);

            if (!side) return;
            if (!curNode[side]) {
                curNode[side] = new Node(data, null, null);
                return;
            } else {
                curNode = curNode[side];
            }
        }
    }

    contains(data) {
        if (!this.root)
            return false;

        var curNode = this.root;
        var side;
        while (true) {
            side = BinaryTree.getSide(data, curNode.data);

            if (!side) return true;
            if (!curNode[side]) {
                return false;
            }
            else {
                curNode = curNode[side];
            }
        }
    }

    remove(data) {
        if (!this.contains(data)) return;
        if (!this.root.left && !this.root.right) {
            this.root = null;
            return;
        }
        var side; // for search and leaf removing

        var parent = null;
        var curNode = this.root;
        while (curNode.data != data) {
            if (!curNode) return;
            parent = curNode;

            side = BinaryTree.getSide(data, curNode.data);
            if (!curNode[side]) return;
            curNode = curNode[side];
        }

        //find subtree min and remove leaf
        var minData = Number.MIN_VALUE;
        var subtree;
        var subtreeParent = curNode;
        if (curNode.left && curNode.right) {
            var oppositeSide = {
                right: 'left',
                left: 'right'
            };
            if (curNode.left) side = 'left';
            else if (curNode.right) side = 'right';

            subtree = curNode[side];
            while (subtree[oppositeSide[side]]) {
                subtreeParent = subtree;
                subtree = subtree[oppositeSide[side]];
            }
            minData = subtree.data;
            if (subtreeParent.data != curNode.data) subtreeParent[oppositeSide[side]] = subtree[side];
            else subtreeParent[side] = subtree[side];

        } else {
            if (curNode.left) subtree = curNode.left;
            else if (curNode.right) subtree = curNode.right;
            else subtree = null;

            if (parent) {
                if (parent.left && parent.left.data == data) parent.left = subtree;
                else if (parent.right && parent.right.data == data) parent.right = subtree;
            }

            if (!curNode.left && !curNode.right) return;
        }

        curNode.data = minData;

    }

    each(root,f) {
        if(!root) return;
        if(root.left) this.each(root.left,f);
        f(root.data);
        if(root.right) this.each(root.right,f);
    }

    getArr() {
        var data = [];
        this.each(this.root,(item)=>{data.push(item);});
        return data;
    }

    size() {
        var length = 0;
        this.each(this.root,()=>{length++;});
        return length;
    }

    isEmpty() {
        return !this.root;
    }
}
