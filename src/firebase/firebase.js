var admin = require("firebase-admin");

var serviceAccount = require("./freelancerio-1be2f-firebase-adminsdk-fbsvc-650fe1ea31.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
