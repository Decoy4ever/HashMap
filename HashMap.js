class HashMap{

    constructor(){
        this.count = 0
        this.loadFactor = 1
    }

    hash(key){
        let hashCode = 0
        let primeNum = 31

        for(let i = 0; i < key.length; i++){
            hashCode = primeNum * hashCode + key.charCodeAt(i)
        }

        return hashCode
    }

}

let hashObj = new HashMap()
console.log(hashObj.hash('b'))