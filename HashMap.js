class HashMap{

    constructor(size = 16){
        // size of the hashMap i.e. number of buckets
        this.size = size

        // create an array of given size
        this.buckets = new Array(size)

        this.count = 0
        this.loadFactor = 0.75
    }

    // hash function converts the key into a hashCode 
    hash(key){

        let hashCode = 0

        // primeNum use to avoid possible collisions
        let primeNum = 31

        for(let i = 0; i < key.length; i++){
            console.log(hashCode)
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.size
        }
        console.log("---")
        return hashCode
    }

    /**
     * `set(key,value)` method returns the buckets arr at the position of the key
     * key is passed into the hash function and returns a hashCode
     * hashCode points to the index in the bucket array
     * For example, key = `apple`, value = `red`
     * hash(key) = 10. Find the index 10 in the buckets array and store the key-value pair
     * bucketsArr[10] = ["Sara","red"]
     * bucketsArr = ["", "", "" ,"", "", "", "","","","","","",["Sara",13] ,...,""]
     */

    set(key,value){
        // find the hashCode
        // create var called index = hashCode % table.size
        // store the key-value pair at the index inside the buckets array

        let hashCode = this.hash(key)
        console.log(hashCode)

        console.log(`Before (key,value) is added to the bucket array`)
        console.log(this.buckets)
        let index = hashCode

        if(index < 0 || index > buckets.length){
            throw new Error(`trying to access index out of bounds`)
        }

        console.log(`After (key,value) is added to the bucket array`)
        this.buckets[index] = value
        console.log(this.buckets)

    }
}

// create a hash table of size 10
let buckets = new HashMap()

// hash(key) produces a hashCode
// let hashCode = hashObj.hash(`apple`)
// console.log(hashCode)

// set(key,value) creates a hash code and pushs the (key,value) in the buckets array
// test 1 the hashCode same but value is different.
buckets.set('apple', 'red')
buckets.set(`apple`,`green`)
buckets.set('banana', 'yellow')
buckets.set('carrot', 'orange')
buckets.set('dog', 'brown')






