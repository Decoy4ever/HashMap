// class Node{
//     constructor(data = null, next = null){
//         this.data = data
//         this.next = next
//     }
// }

// class LinkList{
//     constructor(){
//         this.head = null
//     }

//     append(value){
//         let node = new Node(value)
//         if(this.head === null){
//             this.head = node
//             return this.head;
//         }

//         let current = this.head 
//         while(current.next !== null){

//             // traverse through link list
//             current = current.next 
//         }

//         current.next = node
//         return this.head
//     }
// }


class HashMap{

    constructor(size = 16){
        // size of the hashMap i.e. number of buckets
        this.size = size

        // create an array of given size
        this.buckets = Array.from({length : this.size},() => null)
        this.numOfCollisions = 0
        this.threshold = 0.75
        this.numOfHashKeys = 0 
    }
    
    getLoadFactor(){
        // keep track of the number of entries in the buckets array divided by total size of the buckets array
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
     * hash(key) = 10. Find the index 10 in the buckets array and store the key-value pair 
     */

    set(key,value){
 
        // find the hashCode
        let index = this.hash(key)
        
        if(index < 0 || index > bucketArr.length){
            throw new Error(`trying to access index out of bounds`)
        }        
        console.log(`Inserting the "(key : ${key}, value: ${value})" at index : ${index}`)

        // create a array of (key,value) objects
        let arrOfObj = []
        
        // if bucket at the index/hashCode is empty
        if(this.buckets[index] === null){
            console.log(`No collisions`)
            
            // set the index/hashCode as (key,value) pair
            this.buckets[index] = arrOfObj

            arrOfObj.push({key,value})

            // increment the num of hash keys occupied in buckets array
            this.numOfHashKeys++

            // update load factor
            this.getLoadFactor()

        // if the bucket at the index/hashCode is not empty 
        }else{
            console.log(`Collision occurs at index: ${index}`)

            for(let [_,obj] of Object.entries(this.buckets[index])){

                // if current key is the same as the new key inserted
                if(obj.key === key){
                    // update the value
                    obj.value = value
                    return this.buckets
                }else{
                    this.numOfCollisions++
                    // append the new (key,value)
                    this.buckets[index].push({key,value})
                    return this.buckets
                }
            }

        }

    }

}

// create a hash table of size 10
let bucketArr = new HashMap()

// test 1 updating the value if the two keys are the same
bucketArr.set(`apple`,`green`)
bucketArr.set(`apple`,`red`)

// test 2 checking if a collision occurs and starts chaining objects 
bucketArr.set('elephant', 'gray')
bucketArr.set('raaS', 'purple')


// test 3 checking correctly adds new key,value to the bucket array
// bucketArr.set('banana', 'yellow')
bucketArr.set('elephant', 'gray')

// bucketArr.set('carrot', 'orange')
// bucketArr.set('dog', 'brown')
// bucketArr.set('frog', 'green')
// bucketArr.set('grape', 'purple')
// bucketArr.set('hat', 'black')
// bucketArr.set('ice cream', 'white')
// bucketArr.set('jacket', 'blue')
// bucketArr.set('kite', 'pink')
// bucketArr.set('lion', 'golden')

console.log("Num of buckets occupied: " + bucketArr.numOfHashKeys)
console.log("Num of collisions: " + bucketArr.numOfCollisions)
console.log(bucketArr.getLoadFactor())

console.log(bucketArr.buckets)





