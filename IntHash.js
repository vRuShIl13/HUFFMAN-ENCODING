//child class to the hashable class. and instance of this class is called when the key is an integer
"using strict";

//importing the hashable file from the same folder.
let Hashable = require('./Hashable');

class IntHash extends Hashable{
    //constructor
    constructor(key){
        super(key);
    }

    //value of the integer
    hashVal(){
        return this._key;
    }
    
    equals(x){ 
        if(x === this.getKey){
            return true;
        }
        return false;
    }
}



module.exports = IntHash;