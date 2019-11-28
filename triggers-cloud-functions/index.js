const functions = require('firebase-functions')
const admin = require('firebase-admin')
const rp = require("request-promise")
const {google} = require('googleapis')
admin.initializeApp()

// Listen for any change on document `marie` in collection `users`
exports.buildocx_lab = functions.firestore
    .document('buildocx_lab/{mock}').onWrite((change, context) => {
        const value = change.after.data()
        const scriptId = '1zKTPZ6NHq5wLsMhIF-DuzTIgimJ7qMjRAugglIRYduQTIpJ83prh17xb';
        const script = google.script('v1')
        script.scripts.run({
            auth: google.auth.OAuth2,
            resource: {
                function: 'Foo',
            },
            scriptId: scriptId,
        }, function (err, resp) {
                console.log(resp)
            }

        )

    })
//sudo gcloud functions deploy buildocx_lab --runtime nodejs8 --trigger-event providers/cloud.firestore/eventTypes/document.write --trigger-resource 'projects/buildocx/databases/(default)/documents/buildocx_lab/{mock}'