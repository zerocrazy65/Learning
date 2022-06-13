summation = (x, y, z) => x + y + z
console.log("sum is " + summation(20, 210, 1000))

// rest
numplus = (...numberArr) => {
    let total = 0
    for (let number of numberArr) total += number
    return total
}


console.log("num is " + numplus(20, 410))
console.log("num is " + numplus(2, 40, 1120))
console.log("num is " + numplus(450, 210, 1, 2354))
console.log("num is " + numplus(53, 257, 1234, 35, 352))