var admin = require("firebase-admin");

var serviceAccount = require("./freelancerio-1be2f-firebase-adminsdk-fbsvc-9e2f8fc0de.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
