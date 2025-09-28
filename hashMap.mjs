export default class HashMapArr{

    constructor(size = 16){
        // size of the hashMap i.e. number of buckets
        this.size = size

        // create an array of given size
        this.buckets = Array.from({length : this.size},() => null)
        this.loadFactor = 0.75
    }
    
    /**
     * `getThreshold()` calculate the threshold for current HashMap.
     * The result value of the `getThreshold` and `length()` will determine the resizing of the HashMap.
     */
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

        // if the bucket at the index/hashCode is not empty 
        }else{
            // handle collisions
            for(let pair of this.buckets[index]){
                if(pair.key === key && pair.value !== value){
                    pair.value = value
                }else if(pair.key !== key && pair.value !== value){
                    this.buckets[index].push({key,value})
                }else{
                    return
                }
            }
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
            return true
        }else{
            return false
        }
    }

    /**
     * `length()` finds the total number of keys in the hashmap
     */
    length(){
        let currentHashMap = this.buckets

        return currentHashMap.flat().filter((el) => el !== null).length        
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
     * `values()` returns all the values in the current hash map
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
        let prevHashMap = this.buckets.flat().filter((el) => el !== null)
        // console.log(prevHashMap)
        
        if(capacity > threshold){
            this.size = 2 * this.size

            // reize the bucket array
            this.buckets = Array.from({length : this.size},() => null)
            
            // rehash the (key,value) for the updated HashMap
            prevHashMap.forEach((el) => {
                this.set(el.key, el.value)
            })
            
            // update the threshold
            this.getThreshold()

            return this.buckets
        }
    }
}














