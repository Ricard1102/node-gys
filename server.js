const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const nodemailer = require('nodemailer');
require('dotenv/config');

var app = express();

const port = process.env.PORT || 3000;

//VIEW ENGINE SETUP
hbs.registerPartials(__dirname + '/views/partials');
//app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

//STATIC FOLDER

app.use('/public', express.static(path.join(__dirname + '/public')));

//BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('home.hbs',
    {
      //Head.hbs variables
      keywords: 'Gabarras, Gabarras y servicios, Gabarras&servicios, ',
      metaDescription: 'Gabarras y servicios, servicios y reparaciones marítimas, maritime service, contaminación marina, flota de servicio, Muelle de embarcaciones auxiliares, Puerto Bahía de Algeciras, puerto de Cádiz',
      pageTitle: 'Gabarras & Servicios',

      //Header.hbs variables
      logo: 'public/img/logo.png',
      logoCaption: 'Gabarras & Servicios logo',
      logoTitle: 'Gabarras & Servicios',
      // menu1: '',
      // menu2: '',
      // menu3: '',
      // menu4: '',
      // menu5: '',
      //Hero variables
      h1Title: 'Gabarras & Servicios',

      webmail: 'info@gys.es',
      twitter_url: '',
      facebook_url: 'https://www.facebook.com/Gabarras-y-Servicios-SA-128285560630831/?ref=br_rs',
      googleplus_url: '',
      instagram_url: '',
      linkedin_url: '',

      //Maps
      address: 'Calle Fuente Nueva, 17, 11203 Algeciras, Cádiz, España',
      map_link: 'https://www.google.co.uk/maps/place/Gabarras+Y+Servicios/@36.1238806,-5.4756729,13.78z/data=!4m5!3m4!1s0x0:0xd8c046cd7b0df976!8m2!3d36.1130412!4d-5.4711211',

      //Services variables
      cancellationPolicy1: '',
      cancellationPolicy2: '',
      cancellationPolicy3: '',


      //Contact Variables
      businessPhone: '00 (34) 956 579 024 / 956 572 484'




    });


});

app.post('/send', (req, res) => {
  const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Subject: ${req.body.subject}</li>
    <li>Message: ${req.body.message}</li>
    </ul>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 25, //587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.MAIL_FROM, // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: 'Contact request', // Subject line
    text: 'Hello world', // plain text body
    html: output // html body
  };

  // send mail with defined transport object


  transporter.sendMail(mailOptions, (error, info) => {

    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('partials/thanks', { businessName: 'Gabarras & Servicios' });



  });

});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});







