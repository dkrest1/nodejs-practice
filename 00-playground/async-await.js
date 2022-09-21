const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject("number is less than 1")
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum1 = await add(6, 4)
    const sum2 = await add(sum1, 5)
    const sum3 = await add(sum2, -5)
    return sum3
}

doWork().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})