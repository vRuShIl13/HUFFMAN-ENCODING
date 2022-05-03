//this class represents the single node of a tree. the node contains a character and a weight.
//it also contains a node to the left and to the right.

class Node{

    //constructor
    constructor(value, left,right){
        if(arguments.length === 0){
            this._value = undefined;
            this._left =undefined;
            this._right = undefined;  
    
        }else{

            this._value = value;
            this._left =left;
            this._right = right;  
        }
    }
    
}


module.exports = Node;

