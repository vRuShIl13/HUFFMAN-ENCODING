'use strict';

const Hashable = require('./Hashable');

//hash table that stores key- value pairs ,where key is the identifier and the value is the data.
//there cannot be 2 key-value pairs in the dictionary such that they both have the exact same key
//key and value are 2 different things in the pair
//using arrays that will store the key value pairs. 
class Dictionary{

    //constructor
    constructor(size){
        //creating the array of length size.
        this._hashArray = new Array(size);
    }


    //put method adds the new data in the dictionary. if it dsnt exist, else the value is upadated .
    //no return value
    //=============================================================================================================
    put(k , v){
        //check if k is a string or a number 
        // call the appropriate class
        // get the index using modulo 
        if(k instanceof Hashable){
            if('hashVal' in k && 'equals' in k && typeof(k.hashVal)=== 'function'&& typeof(k.equals)==='function'){
                //make sure value v is not undefined
                if( v !== undefined){
                    //separate chaining method is applied
                    //if there are more than 1 key that index to the same position then those key values can be stored at
                    //that index using a array of key val items/ objects

                    //just a normal object with a hashable key and a value.
                    let _myObj = { key: k , value: v};
                    let _hashIndex = k.hashVal() % this._hashArray.length;

                   
                    //check if the index has an array created or not
                    //array at an index
                    if(this._hashArray[_hashIndex]===undefined){
                        this._hashArray[_hashIndex] = [];
                    }
                    //check if the key exists already, just update the value of the object
                    if(!this.contains(k)){
                          this._hashArray[_hashIndex].push([_myObj.key,_myObj.value]);
                    }else{
                        //object with key k already exists, just update the value of the object
                        for(let i = 0; i< this._hashArray[_hashIndex].length;i++){
                           
                            if(this._hashArray[_hashIndex][i][0]===k){
                                 this._hashArray[_hashIndex][i][1] = v;
                            }
                        }  
                    }
                }else{
                    throw new Error("The value to be added in the dictionary is undefined.");
                }

            }else{
                throw new Error("k is not an instance of any of the child of the hashable class: Does not contain the equals and the hashVal method");
            }
        }else{
            throw new Error("k is not an instance of type handable's any of the child classes.");
        }
        

    }
    //=============================================================================================================
    //this method looks for a value in the dictionary using the key. search for the value using the key.
    //if the key is found then return the value associated otherwise return undefined.
    get(q){
        //get the index at which the value might be found.
        if(q instanceof Hashable){
            if('hashVal' in q && 'equals' in q && typeof(q.hashVal)=== 'function'&& typeof(q.equals)==='function'){
                let _hashIndex = q.hashVal() % this._hashArray.length;
        
                //every index has an array that hold key value pairs.
                //search through the array, look for the key, if key is found,return the 2nd field of the object which holds the value 
                if(this._hashArray[_hashIndex]!==undefined){
                    for(let i = 0; i< this._hashArray[_hashIndex].length;i++){
            
                        if(this._hashArray[_hashIndex][i][0]._key===q._key){
                            return this._hashArray[_hashIndex][i][1];
                        }
                    }
                }
            }else{
                throw new Error("k is not an instance of any of the child of the hashable class: Does not contain the equals and the hashVal method");
            }
        }else{
            throw new Error("k is not an instance of type handable's any of the child classes.");
        }
        return undefined;
    }

    //given the key this method is used to change the value of the data located at the hashVal code of the given key
    set(q, valu){
        //get the index at which the value might be found.
        if(q instanceof Hashable){
            if('hashVal' in q && 'equals' in q && typeof(q.hashVal)=== 'function'&& typeof(q.equals)==='function'){
                let _hashIndex = q.hashVal() % this._hashArray.length;
        
                //every index has an array that hold key value pairs.
                //search through the array, look for the key, if key is found,return the 2nd field of the object which holds the value 
                if(this._hashArray[_hashIndex]!==undefined){
                    for(let i = 0; i< this._hashArray[_hashIndex].length;i++){
            
                        if(this._hashArray[_hashIndex][i][0]._key===q._key){
                            this._hashArray[_hashIndex][i][1] = valu;
                        }
                    }
                }
            }else{
                throw new Error("k is not an instance of any of the child of the hashable class: Does not contain the equals and the hashVal method");
            }
        }else{
            throw new Error("k is not an instance of type handable's any of the child classes.");
        }
        return undefined;
    }

    //takes a hashable key and determines if the key is in the dictionary.
    contains(k){
        if(k instanceof Hashable){
            if('hashVal' in k && 'equals' in k && typeof(k.hashVal)=== 'function'&& typeof(k.equals)==='function'){
                //find the hashCode.
                let _hashIndex = k.hashVal() % this._hashArray.length;
                if(this._hashArray[_hashIndex]!==undefined){
                    for(let i = 0; i< this._hashArray[_hashIndex].length;i++){
                        if(this._hashArray[_hashIndex][i][0]._key===k._key){
                            return true;
                        }
                    }
                }
            }else{
                throw new Error("k is not an instance of any of the child of the hashable class: Does not contain the equals and the hashVal method");
            }
        }else{
            throw new Error("k is not an instance of type handable's any of the child classes.");
        }
        return false;
    }

    //isempty returns a boolean depending on whether the dictionary is empty or not
    isEmpty(){
        for(let i = 0; i< this._hashArray.length;i++){
            if(this._hashArray[i]!==undefined){
                return false;
            }
        }
        return true;
    }

}

//for the file content to be used in other files, this file needs to be exported
module.exports = Dictionary;