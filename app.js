function mySplit(str){
    if(typeof str != 'string'){
        return []
    }
    let arr = str.split(' ')
    return arr
}

console.log(mySplit('This is my doc'))