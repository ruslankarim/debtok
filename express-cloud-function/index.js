const express = require('express')
const requestForTask = require('./fssp/request-for-task').requestForTask
const requestForDadata = require('./dadata/request-for-dadata').requestForDadata
const requestForCheckStatus = require('./fssp/request-for-check-status').requestForCheckStatus
const requestForResult = require('./fssp/request-for-result').requestForResult
const requestForDadataBank = require('./dadata-bank/request-for-dadatabank').requestForDadataBank




const app = express()



app.get('/', (req, res) => {
    res.send('Запрос не определен')
})



app.post('/requestfortask', (req, res) => {
    requestForTask(req, res)
})

app.post('/requestfordadata', (req, res) => {
    requestForDadata(req, res)
})

app.post('/requestfordadatabank', (req, res) => {
    requestForDadataBank(req, res)
})

app.post('/requestforcheckstatus', (req, res) => {
    requestForCheckStatus(req, res)
})

app.post('/requestforresult', (req, res) => {
    requestForResult(req, res)
})

exports.main = app

//sudo gcloud functions deploy main --runtime nodejs8 --trigger-http