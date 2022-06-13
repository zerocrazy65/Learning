// push
const data = [10, 20, 30]
data.push(40)
data.push(...[50, 60, 70])
console.log("push : " + data)

// pop
const data2 = [10, 20, 30]
data2.pop()
console.log("pop : " + data2)

//shift
const data3 = [10, 20, 30]
data3.shift()
console.log("shift : " + data3)

// unshift
const data4 = [10, 20, 30]
data4.unshift(0)
data4.unshift(...[-10, -20, -30])
console.log("unshift : " + data4)

// splice
const data5 = [10, 20, 30, 40, 50]
data5.splice(1, 3, 60) //delete index 1-3 and add 60 to that space
console.log("splice : " + data5)

// slice
const data6 = [10, 20, 30, 40, 50]
const data6store = data6.slice(1, 3) //select index 1-2 (last index-1)
console.log("slice : " + data6store)