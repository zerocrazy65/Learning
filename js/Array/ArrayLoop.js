const data = [10, 20, 30, 40, 50]


// for loop
console.log("for loop")

for (let i = 0; i < data.length; i++) {
    if (data[i] >= 30) break;
    console.log(`No.${i} = ${data[i]}`)
}

// for each
console.log("forEach")

let sum = 0
data.forEach(e => {
    sum += e
    console.log(`sum = ${sum}`)
    if (e >= 50) {
        console.log("more than fifty")
    }
    console.log(`member of array data : ${e}`)
})

// for of
console.log("for of")
for (const element of data) {
    if (element >= 30) break
    console.log(`data left : ${element}`)
}