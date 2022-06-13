// array
const colors = ["white", "red"]
const [a, b] = colors
console.log(a)

// obj
const product = {
    productName: "computer",
    price: 30000,
    stock: 10
}
const { productName: productName, price: price, stock: stock } = product
console.log(product)