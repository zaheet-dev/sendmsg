require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log("tolken", authToken)
console.log("tolken", accountSid)
const client = require('twilio')(accountSid, authToken);

module.exports = function() {

}
module.exports = {
    sendMsg: function(otp, phone) {
        console.log("ee", otp)
        console.log("ee", phone)
        client.messages
            .create({
                body: `hii your otp is : ${otp}`,
                messagingServiceSid: 'MGce6bda1bc39251ebc013e596c6317ee9',
                to: `+91${phone}`
            })
            .then(message => console.log(message.sid))
            .done();
    }
};