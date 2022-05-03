//child class to the hashable class. and instance of this class is called when the key is an string
"using strict";

let Hashable = require('./Hashable');

class StringHash extends Hashable{
    //constructor
    constructor(key){
        super(key);
    }

    //hashVal calculates the code of the string using the ascci values of the characters that make up the string
    hashVal(){
        let _primeSmall = 13;
        let _totalHash = 0;
        let _charVal = 0;

        for(let i = 0; i <this._key.length;i ++){
            _charVal =  this._key.charCodeAt(i);
            _totalHash += _charVal * Math.pow(_primeSmall, this._key.length - i - 1);
        }
        return _totalHash;
    }

    //equal method checks if both string keys have the same value
    equals(x){
        if(this.hashVal === x.hashVal){
            return true;
        }
        return false;
    }
}



module.exports = StringHash;