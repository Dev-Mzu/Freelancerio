var admin = require("firebase-admin");

//var serviceAccount = require("./freelancerio-1be2f-firebase-adminsdk-fbsvc-9e2f8fc0de.json");
let serviceAccount;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
}
else{
  serviceAccount = require("./freelancerio-1be2f-firebase-adminsdk-fbsvc-9e2f8fc0de.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
