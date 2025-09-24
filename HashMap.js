class HashMap{

    constructor(size = 16){
        // size of the hashMap i.e. number of buckets
        this.size = size

        // create an array of given size
        this.buckets = Array.from({length : this.size},() => null)
        this.numOfCollisions = 0
        this.loadFactor = 0.75

        // keep track of the num of hash keys in the hashMap
        this.numOfHashKeys = 0 
    }
    
    getThreshold(){
        return this.size * this.loadFactor
    }

    checkErrorBounds(index){
        if(index < 0 || index > this.buckets.length){
            throw new Error(`trying to access index out of bounds`)
        }  
    }

    /**
     * `hash(key)` converts a key into a hash code
     */
    hash(key){
        let hashCode = 0

        // primeNum use to avoid possible collisions
        let primeNum = 31

        for(let i = 0; i < key.length; i++){
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.size
        }
        return hashCode
    }


    set(key,value){
 
        // find the hashCode
        let index = this.hash(key)
        this.checkErrorBounds(index)   

        // create a array of (key,value) objects
        let arrOfObj = []
        
        // if bucket at the index/hashCode is empty
        if(this.buckets[index] === null){

            // set the index/hashCode as (key,value) pair
            this.buckets[index] = arrOfObj
            arrOfObj.push({key,value})

            // increment the num of hash keys occupied in buckets array
            this.numOfHashKeys++

        // if the bucket at the index/hashCode is not empty 
        }else{

            for(let pair of this.buckets[index]){
                if(pair.key === key && pair.value !== value){
                    pair.value = value
                }else if(pair.key !== key && pair.value !== value){
                    this.numOfCollisions++
                    this.numOfHashKeys++
                    this.buckets[index].push({key,value})
                }else{
                    return
                }
            }

            // for(let [_,hashVal] of Object.entries(this.buckets[index])){

            //     // current key is the same as the new key update the value
            //     // if not push the (key,value) onto the bucket 
            //     if(hashVal.key === key && hashVal.value !== value){
            //         hashVal.value = value
            //     }else if(hashVal.key !== key && hashVal.value !== value){
            //         this.numOfCollisions++
            //         this.numOfHashKeys++
            //         this.buckets[index].push({key,value})
            //     }else{
            //         return;
            //     }
            // }
        }

        this.resize()
    }

    /**
     * `get(key)` finds key in hash map and returns the value associated with the key.
     * if kety does not exist return null
     */
    get(key){
        let index = this.hash(key)
        this.checkErrorBounds(index)   

        // if the bucket at the hashcode is empty/null return null
        let currentBucket = this.buckets[index]
        if(currentBucket === null) return null

        let val = ""
        // if key exists in the bucket i.e. arrOfKeyVal pairs return value assoicated with the key else return null
        for(const pair of currentBucket){
            val = pair.key === key ? pair.value : null
        }
        return val
    }

    /**
     * `has(key)` finds if a key exists in the hash map. 
     * Returns true if it exist else returns false
     */
    has(key){
        let index = this.hash(key)
        this.checkErrorBounds(index)
        let currentBucket = this.buckets[index]
        if(currentBucket === null) return null

        for(const pair of currentBucket){
            return pair.key === key ? true : false
        }
    }

    /**
     * `remove(key)` removes that key in the hash map and returns true else returns false
     */
    remove(key){
        let index = this.hash(key)
        this.checkErrorBounds(index)
        let hashExist = this.has(key)

        if(hashExist === true){
            let currentBucket = this.buckets[index]
            if(currentBucket === null) return false
    
            for(let i = 0; i < currentBucket.length; i++){
                console.log(currentBucket[i].key)
                if(currentBucket[i].key === key){
                    currentBucket.splice(i,1)
                }
            }
            this.numOfHashKeys --
            return true
        }else{
            return false
        }
    }

    /**
     * `length()` finds the total number of keys in the hashmap
     */
    length(){
        return this.numOfHashKeys
    }

    /**
     * `keys()` returns all the keys in the hash map
     */
    keys(){
        let keyArr = []
        let currentBucketArr = this.buckets
        
        // filter the buckets array to only display buckets that have a value
        let bucketHasHash = currentBucketArr.filter((obj) => obj !== null)

        // iterate through the buckets to find the hash keys
        for(let bucket of bucketHasHash){
            for(let obj of bucket){
                keyArr.push(obj.key)
            }
        }
        return keyArr
    }

    /**
     * `values()` returns all the values in the hash map
     */
    values(){
        let currentBucketArr = this.buckets
        let valueArr = []
        
        let bucketHasHash = currentBucketArr.filter((obj) => obj !== null)

        for(let bucket of bucketHasHash){
            for(let obj of bucket){
                valueArr.push(obj.value)
            }
        }
        return valueArr 
    }

    /**
     *  Removes all entries/buckets in hash map
     */
    clear(){
        for(let i = 0; i < this.buckets.length; i++){
            this.buckets[i] = null
        }
        return this.buckets
    }

    /**
     * `entries()` returns an array of (key,value) pairs
     */
    entries(){
        let currentBucketArr = this.buckets
        let bucketHasHash = currentBucketArr.filter((obj) => obj !== null)
        let arrOfHashes = []

        for(let pair of bucketHasHash){
            for(let keyVal of pair){
                arrOfHashes.push(keyVal)
            }
        }
        return arrOfHashes
    }

    /**
     * resize() will modify the number of buckets in the hashMap.
     * If the number of buckets in current HashMap is greater than the threshold it will resize hashMap
     * else return the existing hashMap
     */
    resize(){
        
        let capacity = this.length()
        let threshold = this.getThreshold()

        if(capacity > threshold){

            this.size = this.size * 2
            let tempArr = Array.from({length : this.size}, () => null)

            // update the buckets array
            this.buckets = this.buckets.concat(tempArr)
            
            // update the threshold
            this.getThreshold()

        }
        return this.buckets
    }
}

// create a hashMap
let bucketArr = new HashMap()

// test 1 updating the value if the keys are the same
bucketArr.set(`apple`,`green`)
bucketArr.set(`apple`,`red`)
bucketArr.set(`apple`,`blue`)


// test 2 checking if a collision occurs 
bucketArr.set('elephant', 'gray')
bucketArr.set('raaS', 'purple')
bucketArr.set('elephant', 'gray')


// test 3 checking correctly adds new key,value to the bucket array
bucketArr.set('banana', 'yellow')
bucketArr.set('carrot', 'orange')
bucketArr.set('dog', 'brown')
bucketArr.set('frog', 'green')
bucketArr.set('grape', 'purple')
bucketArr.set('hat', 'black')
bucketArr.set('ice cream', 'white')
bucketArr.set('jacket', 'blue')
bucketArr.set('kite', 'pink')
console.log(bucketArr.buckets)

// test 4 checking if `get(key)` returns a value or not
let getVal = bucketArr.get("lina")
console.log(`value is: ${getVal}`)
// console.log(`\n`)
let getVal2 = bucketArr.get("raaS")
console.log(`value is: ${getVal2}`)
console.log(`\n`)

// test 5 checking if key exists using the `has(key)` 
let has1 = bucketArr.has("apple")
let has2 = bucketArr.has("pineapple")

console.log(has1)
console.log(has2)
console.log(`\n`)

console.log(`BEFORE REMOVAL`)
console.log(bucketArr.buckets)


// test 6 remove the key if it exists and return true
let remove1 = bucketArr.remove("elephant")
console.log(`remove key possible : ${remove1}`)
let remove2 = bucketArr.remove("dinosaur")
console.log(`remove possible : ${remove2}`)

console.log(`\n`)
console.log(`AFTER REMOVAL`)
console.log(bucketArr.buckets)

// Test to check if keys(), value(), length()
console.log(bucketArr.keys())
console.log(bucketArr.values())
console.log(bucketArr.length())
console.log(`\n`)

// Test checking to see if `clear()` clears all buckets to null
// console.log(`Before Hash Map is cleared`)
// console.log(bucketArr.buckets)
// console.log(`\n`)
// console.log(`After HashMap is cleared`)
// console.log(bucketArr.clear())
// console.log(bucketArr.buckets)

// Test to print out all the buckets
console.log(bucketArr.entries())

// Test to see if the `resize()`
bucketArr.set('elephant', 'gray')
bucketArr.set('lion', 'golden')
console.log(bucketArr.resize())










