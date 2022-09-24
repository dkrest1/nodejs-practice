const { calculateTip, fahrenheitToCelcius, celciusToFahrenheit, add } = require("../src/math")

test("should calculate total with tip", () => {
    const total = calculateTip(10, .3)

    // This is the manual method of doing assertion
    // if (total !== 13) {
    //     throw new Error("Total should be 13. Go " + total)
    // }

    expect(total).toBe(13)
})

test("should calculate total with default tip", () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test("should convert 32F into 0C", () => {
    const conversion = fahrenheitToCelcius(32)
    expect(conversion).toBe(0)
})

test("should convert 0C to 32F", () => {
    const conversion = celciusToFahrenheit(0)
    expect(conversion).toBe(32)
})

// test("async test demo", (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })


test("should add two numbers", (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test("should add two numbers using async await", async () => {
    const sum = await add(10, 10)
    expect(sum).toBe(20)
})
