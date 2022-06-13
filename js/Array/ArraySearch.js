const colors = ["red", "green", "blue", "purple", "white"]

// indexOf
const index = colors.indexOf("blue") //-1 is undefined
console.log("index : " + index)

// find
const found = colors.find(e => e === "blue")
console.log("found : " + found)

// findIndex (find first index)
const search = colors.findIndex(e => e === "blue")
console.log("findIndex : " + search)