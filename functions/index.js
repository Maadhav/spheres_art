const functions = require("firebase-functions");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const nodemailer = require("nodemailer");

exports.createContact = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST");

  const { email } = request.query;
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = functions.config().sendinblue.key;

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  let createContact = new SibApiV3Sdk.CreateContact();

  console.log(apiKey);

  createContact.email = email;
  createContact.listIds = [3];

  apiInstance.createContact(createContact).then(
    function (data) {
      functions.logger.info("API called successfully");
      response.send("API called successfully");
    },
    function (error) {
      functions.logger.error(error);
      response.status(400).send(error);
    }
  );
});

exports.sendEmail = functions.https.onRequest((request, response) => {

  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST");

  const { email, msg, name } = request.query;

  
  var mailer = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
      user: functions.config().sendinblue.user,
      pass: functions.config().sendinblue.password,
    },
  });
  functions.logger.info(mailer)

  mailer.sendMail({
    from: `${name} <${email}`,
    to: 'contact@sphere.art',
    subject: 'Contact for Sphere.art Marketplace',
    text: msg,
  }).then(val => response.send("API called successfully")).catch(err => response.status(400).send(err));

});