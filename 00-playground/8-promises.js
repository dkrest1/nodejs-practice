const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(2, 2).then((sum) => {
//     console.log(sum)
//     add(sum, 6).then((sum2) => {
//         console.log(sum2)
//     }).catch((err) => {
//         console.log(err)
//     })

// }).catch((e) => {
//     console.log(error)
// })

add(2, 3).then((sum) => {
    console.log(sum)
    return add(sum, 6)
}).then((sum2) => {
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})