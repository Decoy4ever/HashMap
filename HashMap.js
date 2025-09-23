class HashMap{

    constructor(size = 16){
        // size of the hashMap i.e. number of buckets
        this.size = size

        // create an array of given size
        this.buckets = Array.from({length : this.size},() => null)
        this.numOfCollisions = 0
        this.loadFactor = 0.75

        // keep track of the num of hash keys push into the hashMap
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

    hash(key){
        let hashCode = 0
        // primeNum use to avoid possible collisions
        let primeNum = 31

        for(let i = 0; i < key.length; i++){
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.size
        }
        // console.log("---")
        return hashCode
    }

    set(key,value){
 
        // find the hashCode
        let index = this.hash(key)

        this.checkErrorBounds(index)   
        // console.log(`Inserting the "(key : ${key}, value: ${value})" at index : ${index}`)

        // create a array of (key,value) objects
        let arrOfObj = []
        
        // if bucket at the index/hashCode is empty
        if(this.buckets[index] === null){
            // console.log(`No collisions`)

            // set the index/hashCode as (key,value) pair
            this.buckets[index] = arrOfObj
            arrOfObj.push({key,value})

            // increment the num of hash keys occupied in buckets array
            this.numOfHashKeys++

            // update load factor
            this.getThreshold()

        // if the bucket at the index/hashCode is not empty 
        }else{
            // console.log(`Collision occurs at index: ${index}`)
            for(let [_,hashVal] of Object.entries(this.buckets[index])){

                // current key is the same as the inserted new key update the value
                // if not push the (key,value) onto the array 
                if(hashVal.key === key && hashVal.value !== value){
                    hashVal.value = value
                }else if(hashVal.key !== key && hashVal.value !== value){
                    this.numOfCollisions++
                    this.numOfHashKeys++
                    this.buckets[index].push({key,value})
                }else{
                    return;
                }
            }
        }

        this.resize()
    }

    /**
     * `get(key)`
     * takes one argument as a key and 
     * returns the value that is assigned to this key. 
     * If a key is not found, return null
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

    has(key){
        let index = this.hash(key)
        this.checkErrorBounds(index)
        let currentBucket = this.buckets[index]
        if(currentBucket === null) return null

        for(const pair of currentBucket){
            return pair.key === key ? true : false
        }
    }

    remove(key){
        let index = this.hash(key)
        this.checkErrorBounds(index)
        let hashExist = this.has(key)
        console.log(`hash exists : ${hashExist}`)

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

    length(){
        return this.numOfHashKeys
    }

    keys(){
        let currentBucketArr = this.buckets
        let keyArr = []
        
        // remove all buckets that have null in the bucketArr
        let bucketHasHash = currentBucketArr.filter((obj) => obj !== null)

        // iterate through the buckets to find the hash keys
        for(let bucket of bucketHasHash){
            for(let obj of bucket){
                keyArr.push(obj.key)
            }
        }
        return keyArr
    }

    values(){
        let currentBucketArr = this.buckets
        let valueArr = []
        
        // remove all buckets that have null in the bucketArr
        let bucketHasHash = currentBucketArr.filter((obj) => obj !== null)

        // iterate through the buckets to find the hash keys
        for(let bucket of bucketHasHash){
            for(let obj of bucket){
                valueArr.push(obj.value)
            }
        }
        return valueArr 
    }

    clear(){
        for(let i = 0; i < this.buckets.length; i++){
            this.buckets[i] = null
        }
        return this.buckets
    }


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

    resize(){
        
        // find the current num of entries
        console.log(`Num of entires`)
        console.log(this.length())
        console.log(`Current threshold`)
        console.log(this.getThreshold())

        if(this.length() > this.getThreshold()){
            console.log(`Num of entires`)
            console.log(this.length())
            console.log(`Num of entires has surpassed threshold`)
            this.size = this.size * 2
            let tempArr = Array.from({length : this.size}, () => null)
            this.buckets.concat(tempArr)

            // update the threshold
            console.log(`Updated threshold is now`)
            this.getThreshold()

            return this.buckets
        }else{
            return this.buckets
        }
    }
}

// create a hash table of size 10
let bucketArr = new HashMap()

// test 1 updating the value if the two keys are the same
bucketArr.set(`apple`,`green`)
bucketArr.set(`apple`,`red`)
bucketArr.set(`apple`,`blue`)


// test 2 checking if a collision occurs and starts chaining objects 
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

// test 4 checking if `get(key)` returns the value
// let getVal = bucketArr.get("lina")
// console.log(`value is: ${getVal}`)
// console.log(`\n`)
// let getVal2 = bucketArr.get("raaS")
// console.log(`value is: ${getVal2}`)


// test 5 checking if key exists using the `has(key)` 
// let has1 = bucketArr.has("apple")
// let has2 = bucketArr.has("pineapple")

// console.log(has1)
// console.log(has2)

// console.log(`BEFORE REMOVAL`)
// console.log(bucketArr.buckets)

// test 6 remove the key if it exists and return true
// let remove1 = bucketArr.remove("elephant")
// console.log(remove1)

// let remove2 = bucketArr.remove("dinosaur")
// console.log(remove2)


// console.log(`AFTER REMOVAL`)
// console.log(bucketArr.buckets)
// console.log("Num of collisions: " + bucketArr.numOfCollisions)
// console.log(bucketArr.keys())
// console.log(bucketArr.values())
// console.log(bucketArr.length())
// console.log(`Before Hash Map is cleared`)
// console.log(`After HashMap is cleared`)
// console.log(bucketArr.clear())
// console.log(bucketArr.entries())
// console.log(`-----`)
// console.log(bucketArr.buckets)

// settu=ing new values in hashMap
// bucketArr.set('banana', 'yellow')
// console.log(bucketArr.buckets)
console.log(bucketArr.set('lion', 'golden'))
console.log(bucketArr.resize())








