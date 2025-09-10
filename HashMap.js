class Node{
    constructor(data = null, next = null){
        this.data = data
        this.next = next
    }
}

class LinkList{
    constructor(){
        this.head = null
    }

    append(value){
        let node = new Node(value)
        if(this.head === null){
            this.head = node
            return this.head;
        }

        let current = this.head 
        while(current.next !== null){

            // traverse through link list
            current = current.next 
        }

        current.next = node
        return this.head
    }
}


class HashMap{

    constructor(size = 16){
        // size of the hashMap i.e. number of buckets
        this.size = size

        // create an array of given size
        this.buckets = Array.from({length : this.size},() => null)

        // keep track of the number of entries in the buckets array divided by total size of the buckets array
        this.threshold = 0.75
        this.numOfHashKeys = 0 
    }

    getLoadFactor(){
        return this.numOfHashKeys / this.buckets.length
    }

    // hash function converts the key into a hashCode 
    hash(key){

        let hashCode = 0

        // primeNum use to avoid possible collisions
        let primeNum = 31

        for(let i = 0; i < key.length; i++){
            // console.log(hashCode)
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.size
        }
        console.log("---")
        return hashCode
    }

    /**
     * `set(key,value)` method creates a (key,value) pair in the buckets array
     * key is passed into the hash function and returns a hashCode
     * set the index of the buckets array to the hashCode
     * For example, key = `apple`, value = `red`
     * hash(key) = 10. Find the index 10 in the buckets array and store the key-value pair as a link list
     * bucketsArr[10] = { data : {key : "apple", value : "red"},next : null}
     * bucketsArr = ["", "",....., { data : {key : "apple", value : "red"},next : null} ,...,""]
     */

    set(key,value){
        // find the hashCode using the method above
        // create var called index = hashCode 
        // Buckets array start fill the data with link lists
        let linkList = new LinkList()

        let index = this.hash(key)
        console.log(`Inserting the (key,value) at index : ${index}`)
        
        if(index < 0 || index > buckets.length){
            throw new Error(`trying to access index out of bounds`)
        }        
        
        let pair = linkList.append({key,value})
        
        // check if bucket at the index is empty
        if(this.buckets[index] === null){
            console.log(`No collisions`)
            linkList.head = null
            console.log(pair)

            this.buckets[index] = pair
            console.log(this.buckets)

            // increment the num of hash keys occupied in buckets array
            this.numOfHashKeys++

            // update load factor
            this.getLoadFactor()

        // if the bucket is not empty the current occupied link list and start chaining
        }else{
            console.log(`Collision occurs at index: ${index}`)
            console.log(`Current Link List at ${index}`)
            linkList.head = this.buckets[index]
            console.log(linkList.head)

            linkList.append(pair)
            console.log(this.buckets)
        }

        return this.buckets
    }

}

// create a hash table of size 10
let buckets = new HashMap()

// test 2 the buckets array is all full
let bucketsFull = new HashMap()
bucketsFull.set(`apple`,`green`)


// these two produce collision
bucketsFull.set('elephant', 'gray')
bucketsFull.set('raaS', 'purple')
console.log(bucketsFull.getLoadFactor())











