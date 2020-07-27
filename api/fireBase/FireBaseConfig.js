var admin = require("firebase-admin");

var serviceAccount = require("./sirar-con-firebase-adminsdk-zzg2d-3c13f1a1f0.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sirar-con.firebaseio.com"
})

module.exports.admin = admin