//huffman encoding is used to compress text files by replacing the characters with binary numbers
//this class deals with reading the whole text file
//counting the frequencies of every character and calculating the %s of the freqs

let Dictionary = require('./Dictionary');
let StringHash = require('./StringHash');
let Node = require('./Node');
let HuffmanTree = require('./HuffmanTree');

class HuffmanEncoding{

    _file;
    //gets the name of the file
    constructor(file){
        //call the parseFIle method here.
        this._file = file;
        this.parseFile(file);
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //on creatioon of an instance of this class, there is a file that is passed as a parameter.
    //thhis method opens the file and reads its content.
    //it will then count the frequency of every character and calculate the % of use.
    //a hash table dictionary is created that stores this information
    parseFile(file) {
        let io = require('fs');
        let contents = io.readFileSync(file, "utf8");

        let singles = contents.split("");

        let _table = new Dictionary(singles.length+1);
        for(let i = 0; i< singles.length; i++){
          
            let _newAdd = new StringHash(singles[i]);
            if(_table.contains(_newAdd)){
                let val = _table.get(_newAdd);
                val = val + 1;
                _table.set(_newAdd , val);
            }else{
                _table.put(_newAdd,1);
            }
        }
        
        for(let i = 0; i<_table._hashArray.length; i++){
            if(_table._hashArray[i] !== undefined){
                
                for( let j = 0; j< _table._hashArray[i].length; j++){
                    
                    let _percentage =  _table._hashArray[i][j][1] / singles.length
                    _table._hashArray[i][j][1] = _percentage;
                }
            }

        }
        this.makeHuffmanTrees(_table);
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //this method creates an array of single left huffman trees, these trees contain a char value and the weight of the value 
    //this information is extracted from the table created and it is passed as a parameter in this method.
    makeHuffmanTrees(table){
        //first making a set of leaf trees with all the characters from the hash table
        let _set = []; //empty array that will hold a number of huffman trees.

        if('_hashArray' in table){
            if(!table.isEmpty()){
            
                for(let i = 0; i< table._hashArray.length;i++){
                    if(table._hashArray[i]!==undefined){
                        for(let j = 0; j< table._hashArray[i].length;j++){
                            let _k =  table._hashArray[i][j][0]._key;
                            let _weight = table._hashArray[i][j][1];
                            
                            let _hastSingleLeafTree = new HuffmanTree(_k,_weight);
                            _set.push(_hastSingleLeafTree);
                        }
                    }
                }
                this.makeOneHuffTree(_set);
            }       
        } 
    }

    
    //-----------------------------------------------------------------------------------------------------------------------------------
    //this method is used to combine all the single leaf huffman trees into 1 big tree.
    //the algo is as follows.
    //1. ordering the array of the trees in terms of weight using the compare method.
    //2. the 2 smallest trees are combined, removed from the set and the new tree is added to the array
    //3. this is done until 1 tree is left in the array TREE T
    makeOneHuffTree(_set){
        this.orderArray(_set);

        while(_set.length >1){
            let _small1 = _set[0];
            let _small2 = _set[1];

            //make a dummy tree.
            let bigger = new HuffmanTree(undefined,undefined);

            bigger.combine(_small1,_small2);

            //remove the first 2 trees that are combined into 1 tree
            _set.shift();
            _set.shift();

            //add the new combined tree to the array of trees
            _set.push(bigger);
            
            //arrange the trees in order
            this.orderArray(_set);
        }

        this.createHuffManCode(_set);
    }


    
    //-----------------------------------------------------------------------------------------------------------------------------------
    //helper method
    //everytime there is a change in the array of trees, either a removal or adding a new combined tree,
    //order the array by comparing the trees.
    orderArray(_set){

        _set.sort((tree1,tree2)=>{
            let _result = tree1.compare(tree2);
            if(_result=== 1){
                return 1;
            }else if (_result=== -1) {
                return -1;
            }else {
                let _smallestThis = tree1.getSmallestLeafData(tree1._root);
                let _smallestOther = tree2.getSmallestLeafData(tree2._root);
     
                if(_smallestThis < _smallestOther){
                   return -1; 
                }else if(_smallestThis > _smallestOther){
                    return 1;
                }

            }
        }) 
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //once the single tree is ready, this method is used to create theHUFFMAN code.
    //this method used the tree to make a hashTable of a key and its path/ the binary code
    createHuffManCode(_set){
        //maybe create ahash table?
        let table = new Dictionary(200);
        let _myEncode = _set[0].traverse(_set[0]._root,"", table);
        this.readCharGiveEncode(_myEncode);
    }


    //-----------------------------------------------------------------------------------------------------------------------------------
    //final step
    //read the characters from the file again., and output its encoding.
    readCharGiveEncode(_myEncode){

        
        let io = require('fs');
        let data = io.readFileSync(this._file ,"utf8");

        let eachChar = data.split("");

        for(let each of eachChar){
            let _code = this.findEncode(_myEncode, each);
           
            io.appendFileSync("t1.txt.huff", _code+" ");
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //looks for the encoding using the get method and returns.
    findEncode(_myEncode , char){
        if('get' in _myEncode && typeof(_myEncode.get) === 'function'){
            let _cde = _myEncode.get(new StringHash(char));
            if(_cde !==undefined){
                return _cde;
            }
        }
    }

}
//-----------------------------------------------------------------------------------------------------------------------------------
//this is the method that is called from the command prompt
//the command line arguments are used 
//the 3rd argument is the file name.
function test(){
    let args = process.argv;
    let file = args[2];
    let hf = new HuffmanEncoding(file);
}
//-----------------------------------------------------------------------------------------------------------------------------------
//encode!! exciting!
test();
