import HashMapArr from "./hashMap.mjs"

// create a hashMap
const bucketArr = new HashMapArr()

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
let getVal2 = bucketArr.get("raaS")
console.log(`value is: ${getVal2}`)
console.log(`\n`)

// test 5 checking if key exists using the `has(key)` 
let has1 = bucketArr.has("apple")
let has2 = bucketArr.has("pineapple")

console.log(has1)
console.log(has2)
console.log(`\n`)

// console.log(`BEFORE REMOVAL`)
// console.log(bucketArr.buckets)


// // test 6 remove the key if it exists and return true
let remove1 = bucketArr.remove("elephant")
console.log(`remove key possible : ${remove1}`)
let remove2 = bucketArr.remove("dinosaur")
console.log(`remove possible : ${remove2}`)

console.log(`\n`)
console.log(`AFTER REMOVAL`)
console.log(bucketArr.buckets)

// // Test to check if keys(), value(), length()
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
// console.log(bucketArr.entries())


console.log(`Previous Hash Map`)
console.log(bucketArr.buckets)
console.log("num of hash keys in HashMap: " + bucketArr.length())
console.log("threshold: " + bucketArr.getThreshold())
console.log(`----`)

// Test to see if the `resize()`
console.log(`Updated Hash Map`)
bucketArr.set('lion', 'golden')
bucketArr.set('moon', 'silver')
// console.log(bucketArr.buckets)
console.log("num of hash: " + bucketArr.length())
console.log(bucketArr.resize())

console.log("num of hash keys in hashMap: " + bucketArr.length())
console.log("threshold: " + bucketArr.getThreshold())

