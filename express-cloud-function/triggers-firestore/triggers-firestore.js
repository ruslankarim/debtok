const functions = require('firebase-functions')

exports.triggersFirestore = functions.firestore
    .document('...')
    .onWrite((change, context) => { /* ... */ })