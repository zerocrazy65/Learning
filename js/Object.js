myaccount = () => {
    const username = "zerocrazy65"
    const age = 40
    const address = "bankok"
    const customer = { username, age, address }
    return (
        console.log(customer)
    )

}
myname = () => {
    const myname = "katapat"
    const surname = "supameteegullawat"
    const age = 22
    const mydetail = {
        myname,
        surname,
        age,
        showdetail() {
            console.log(mydetail)
        }
    }
    return (
        mydetail.showdetail()
    )
}
myaccount()
myname()