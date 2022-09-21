const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "aktosin1@gmail.com",
        subject: "Thanks for joining us",
        text: `Welcome to the app ${name} let me know about how you feel about us`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "aktosin1@gmail.com",
        subject: "We could have hurt you bad",
        text: `We are sorry ${name} what could we have done wrong, we would love to know`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}




