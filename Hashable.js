//this class is an abstract class that represents a key, used in the hash table
//it will have abstract methods that will be implements be the child classes


"using strict"

class Hashable{
    //constructor
    constructor(key){
        if(this.constructor.name === "Hashable"){
            throw new error("Class Hashable is an abstract class and cannot be instantiated");
        }else{
            this._key = key;
        }
    }

    //hashVal method abstract , must be in the child classes
    hashVal(){
        throw new error("The hashVal method is abstract and needs an impelementation in "+ this.constructor.name);
    }

    //equals method is an abstract method that needss to be in all of the child classes
    equals(x){
        throw new error("The equals method is abstract and needs an implementation in "+ this.constructor.name);
    }

}

//for the child classes to import
module.exports = Hashable;

