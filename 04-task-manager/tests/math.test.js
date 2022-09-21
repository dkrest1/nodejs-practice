const { calculateTip, fahrenheitToCelcius, celciusToFahrenheit } = require("../src/math")

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

test("async test demo", () => {
    setTimeout(() => {
        expect(1), toBe(2)
    }, 2000)
})