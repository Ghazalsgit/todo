const nodemailer = require("nodemailer")
const nodemailerSendgrid = require("nodemailer-sendgrid")

const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_KEY,
    })
);

const feedbackAddedEmail = (feedback) => {
    transport.sendMail({
        from: "Todo <ghazalasaady@hotmail.com>",
        to: `${feedback.name} <${feedback.email}>`,
        subject: "Feedback received",
        html: `<h1>Thank you for your feedback!</h1><br><h2 style = 'text-align: center;'>Dear ${feedback.name}</h2><br><p style = 'text-align: center;' >We truly value your feedback and the time you took to evaluate our website. We hope to be able to implement them in the next update.</p>`,
        text: `Dear ${feedback.name} We truly value your feedback and the time you took to evaluate our website. We hope to be able to implement them in the next update.`

    }).then(() => console.log("email sent")).catch((error) => console.log(error))
}

exports.feedbackAddedEmail = feedbackAddedEmail;