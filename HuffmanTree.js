"using strict";


const { setFlagsFromString } = require('v8');
const Dictionary = require('./Dictionary');
let Node = require('./Node');
const StringHash = require('./StringHash');
//this class represents a binary tree used in huffman encoding
//each tree is a binary tree, children are not ordered.

//this holds one or more nodes together to form a binary huffman tree.
//the internal nodes do not contain any value, but have left and right childs.
//the leaf nodes have value and not the child nodes.
//the tree has a weight however small the tree is.

//any particular tree contains a node or nodes and the total weight of the tree.

class HuffmanTree{

    //pruivate fields
    #smallRecusiveVal;

    //constructor
    constructor(charValue, weight){
        this._root = new Node(charValue, undefined, undefined);
        this._weight = weight;    
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //this method combines 2 smaller subtrees to create one big tree. 
    //the new weight is the total weight of the 2 subtrees.
    combine(oneTree , other){


        if('_root' in oneTree &&'_weight' in oneTree &&'_root' in other &&'_weight' in other ){
            let _result = this.compareTo(oneTree, other);
            if(_result === -1){
        
                this._root = new Node(undefined, oneTree._root, other._root);
        
            }else if (_result === 1){
            
                this._root = new Node(undefined, other._root, oneTree._root);
        
            }else{
                //this is unreachable because there are no duplicates in the huffman tree.
                this._root = new Node(undefined, oneTree._root, other._root);
            }
            this._weight = oneTree._weight+ other._weight;
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //this method is for comparing the weight of 2 trees.
    //this method return 1,0,-1 depending on the  comparison of the 2 trees.
    //
    compareTo(oneTree, otherTree){
        if('_root' in oneTree &&'_weight' in oneTree &&'_root' in otherTree &&'_weight' in otherTree ){
            if(oneTree._weight< otherTree._weight){
                return -1;
            }else if (oneTree._weight > otherTree._weight){
                return 1;
            }else{
                let _smallestThis = this.getSmallestLeafData(oneTree._root);
                let _smallestOther = this.getSmallestLeafData(otherTree._root);
            
                if(_smallestThis < _smallestOther){
                return -1; 
                }else if(_smallestThis > _smallestOther){
                    return 1;
                }else{
                    return 0;
                }
            }
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //this method is used to traverse the binary tree to every leaf node to get the data.
    //it compares every character to find the lowest of all and it is returned.
    getSmallestLeafData(treeRoot){

        if(treeRoot === undefined ){
            return -1;
        }

        if(treeRoot._left === undefined && treeRoot._right === undefined){
          
            if(this.#smallRecusiveVal === undefined){
                this.#smallRecusiveVal = treeRoot._value;
            }else if(treeRoot._value < this.#smallRecusiveVal ){   
                this.#smallRecusiveVal = treeRoot._value;
            }
            return treeRoot._value;
        }

        if(treeRoot._left !== undefined){
            this.getSmallestLeafData(treeRoot._left);
        }

        if(treeRoot._right !== undefined){ 
            this.getSmallestLeafData(treeRoot._right);
        }
        return this.#smallRecusiveVal;
    }
    //-----------------------------------------------------------------------------------------------------------------------------------
    //travesal method that is used for deteminig the path to each character in the leaf nodes.
    //a sequence of 0s and 1s that help in finding a certain character in the huffman tree.
    //returns an array of a char, path pair object.
    traverse(treeRoot, string, myObj){
            if(treeRoot._left !== undefined ){
                this.traverse(treeRoot._left,string+ "0",myObj);
            }
            if(treeRoot._right !== undefined){
                this.traverse(treeRoot._right,string+ "1",myObj);
            }
            if(treeRoot._left === undefined && treeRoot._right === undefined){
                myObj.put(new StringHash(treeRoot._value), string);
                //myObj.push({Val : treeRoot._value,path: string});
            }
            return myObj;
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //helper method that compares this tree with another. Used in Part 3 Step 3,
    //everytime 2 smaller trees are created, a big one is made and added to an array of trees.
    //this array is then sorted , and this method is used for comparison.
    //similar to compare To method , just the parameters are diffrent.
    compare(otherTree){
        if('_root' in otherTree &&'_weight' in otherTree ){
            if(this._weight< otherTree._weight){
                return -1;
            }else if (this._weight > otherTree._weight){
                return 1;
            }
            return 0;
        }
    }

}

module.exports = HuffmanTree;



