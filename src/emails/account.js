const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEamil=(email, name)=>{
    sgMail.send({
        to:email,
        from:'mostafa.floyd8844@gmail.com',
        subject:'Thanks for Signing in',
        text:`Welcome ${name} in the task application, keep us posted with your opinion`
    })
}
const sendCancelEmail=(email, name)=>{
    sgMail.send({
        to:email,
        from:'mostafa.floyd8844@gmail.com',
        subject:'Sad To See You go',
        text: `${name}, we really are sad to see you go , can you tell us what is the cause of this? `
    });
}
// const msg = {
//     to: 'mostafa.abdelshafy88@gmail.com',
//     from: 'mostafa.floyd8844@gmail.com',
//     subject: 'First Created Email',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   };
//   sgMail.send(msg).then(() => {}, error => {
//     console.error(error);
 
//     if (error.response) {
//       console.error(error.response.body)
//     }
//   });

module.exports= {
    sendWelcomeEamil,
    sendCancelEmail
}