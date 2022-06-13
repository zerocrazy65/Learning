const newArr = [100, 200, 300]
const data = [10, 20, ...newArr]
console.log(data)

const colors = ["green", "blue", "red"]
const allcolors = ["yellow", "purple", ...colors]
console.log(allcolors)

const friendname = ["bat", "blue", "brown"]
const othername = ["jojoe", "gommo", ...friendname]

const oldname = ["jazz", "lower"]
othername.push(...oldname)
console.log(othername)