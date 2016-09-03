var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://fedecrespo90%40gmail.com:anislaputamadre2@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fede Crespo" <fedecrespo90@gmail.com>', // sender address
    to: 'racracsellodigital@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
// var nodemailer = require("nodemailer");
// var querystring = require("querystring");
// var smtpTransport = nodemailer.createTransport('smtps://racracsellodigital@gmail.com%40gmail.com:flemita1@smtp.gmail.com');
// var emailSystem = {
//   sendNow:function(req, res) {
//     var info = '';
//     //var form = querystring.parse(info);
//     emailSystem.startSending(req.body.from, req.body.name, req.body.content);
//     console.log("From: "+req.body.name);
//     console.log("To: "+req.body.from);
//     console.log("Content: "+req.body.content);
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     var pagina='<!doctype html><html><head></head><body>Done!</body></html>';
//     res.end(pagina);
//
//   },
//   startSending:function(fromE, name, content) {
//     smtpTransport.sendMail({
//        from: name+"<"+fromE+">", // sender address
//        to: "Me <racracsellodigital@gmail.com>, <fedecrespo90@gmail.com>, <flor es crespoflori@gmail.com>, <martinpalmieri@gmail.com>", // comma separated list of receivers
//        subject: "Mail de selloracrac.com ✔", // Subject line
//        text: content // plaintext body
//     }, function(error, res){
//        if(error){
//            console.log(error);
//        }else{
//            console.log("Message sent: " + res.message);
//        }
//     });
//   }
// };
// module.exports = emailSystem;
