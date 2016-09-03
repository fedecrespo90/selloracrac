var nodemailer = require("nodemailer");
var querystring = require("querystring");
var smtpTransport = nodemailer.createTransport('smtps://racracsellodigital@gmail.com%40gmail.com:flemita1@smtp.gmail.com');
var emailSystem = {
  sendNow:function(req, res) {
    var info = '';
    //var form = querystring.parse(info);
    emailSystem.startSending(req.body.from, req.body.name, req.body.content);
    console.log("From: "+req.body.name);
    console.log("To: "+req.body.from);
    console.log("Content: "+req.body.content);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var pagina='<!doctype html><html><head></head><body>Done!</body></html>';
    res.end(pagina);

  },
  startSending:function(fromE, name, content) {
    smtpTransport.sendMail({
       from: name+"<"+fromE+">", // sender address
       to: "Me <racracsellodigital@gmail.com>, <fedecrespo90@gmail.com>, <flor es crespoflori@gmail.com>, <martinpalmieri@gmail.com>", // comma separated list of receivers
       subject: "Mail de selloracrac.com ✔", // Subject line
       text: content // plaintext body
    }, function(error, res){
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + res.message);
       }
    });
  }
};
module.exports = emailSystem;
