const data = [10, 20, 30, 40]
const mapData = data.map(e => 100)
console.log("map : " + mapData)
const filterData = data.filter(e => e > 20)
console.log("filter : " + filterData)
    // Reduce
    // array.reduce(()=>{},default) // total = 0
const reduce = data.reduce((value, e) => {
    // value = 0
    // total = loop {index of data + value}
    const total = e + value
    return total
}, 0)
console.log("reduce : " + reduce)

// Reduce Example
const cart = [
    { name: "bag", price: 500 },
    { name: "book", price: 310 },
    { name: "camera", price: 15000 }
]
const result = cart.reduce((value, e) => {
    const total = value + e.price
    return total
}, 0)
console.log("result : " + result)