const functions = require("firebase-functions");
const SibApiV3Sdk = require("sib-api-v3-sdk");

exports.createContact = functions.https.onRequest((request, response) => {
  request.headers["access-control-allow-origin"] = "*";
  request.headers["access-control-allow-methods"] = "GET";

  const { email } = request.query;
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = functions.config().sendinblue.key;

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  let createContact = new SibApiV3Sdk.CreateContact();

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
