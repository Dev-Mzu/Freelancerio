var admin = require("firebase-admin");

var serviceAccount = require("./freelancerio-1be2f-firebase-adminsdk-fbsvc-c25875b105.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
