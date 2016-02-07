'use strict';

class BinaryTree {
    constructor() {
        this.root = null;
    }

    static getSide(data, nodeData) {
        if (data == nodeData) return undefined;
        if (data < nodeData) return 'left';
        else if (data > nodeData) return 'right';
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
        if (!this.root) return false;

        var curNode = this.root;
        while (true) {
            var side = BinaryTree.getSide(data, curNode.data);

            if (!side) return true;
            if (!curNode[side]) return false;
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
        var side; // for search and removing

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

    getArr(root) {
        var data = [];
        if (!root) return data;
        if (root.left) {
            data = data.concat(this.getArr(root.left));
        }
        data.push(root.data);
        if (root.right) {
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
