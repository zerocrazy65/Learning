// map num
const numbers = [10, 20, 30, 40]
console.log("Number : " + numbers)
const result = numbers.map(e => e * 2)
console.log("Array Map : " + result)

// map text
const weather = ["cold", "rainy", "warm", "hot"]
console.log("weather : " + weather)
const temperature = weather.map((e, i) => {
    return ` Day ${i+1} : ${e}`
})
console.log("temperature : " + temperature)

// map object in array
const data = [
    { day: "01/06/2565", weather: "hot", temp: 39 },
    { day: "03/06/2565", weather: "warm", temp: 33 },
    { day: "07/06/2565", weather: "rainy", temp: 29 }
]
const resultdata = data.map(e => e.weather)
console.log("allweather : " + resultdata)