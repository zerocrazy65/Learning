getDataCustomer = (customerName, customerAddress = "Address undefine") => {

    const address = `customerName : ${customerName}
    address : ${customerAddress}`
    return address
}

console.log(getDataCustomer("katapat", "bangkok"))
console.log(getDataCustomer("amazonia"))