// filter
const data = [10, 20, 30, 40]
const filter = data.filter(e => {
    return e > 20
})
console.log("filter : " + filter)

// filter obj
const data2 = [
    { name: "bat", salary: 20000, department: "graphic design" },
    { name: "bass", salary: 24000, department: "graphic design" },
    { name: "boss", salary: 38000, department: "developer" },
    { name: "bin", salary: 45000, department: "programer" },
    { name: "botan", salary: 41000, department: "developer" },
]

const salary = data2.filter(e => e.salary > 30000).filter(e => e.department === "developer")
console.log(salary)