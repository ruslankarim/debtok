const { constants } = require('./constants')
const rp = require('request-promise')

exports.requestForCheckStatus = (req, res) => {
    const {task} = req.body
    requestForCheckStatus(task).then((result) => {
        res.send(result)
    })
}

const requestForCheckStatus = (task) => {
    const url = constants.baseUrl + '/status?task=' + task + '&' + 'token=' + constants.keyFSSPBuildocx
    const encodedUrl = encodeURI(url)
    return rp(encodedUrl).then((res) => {
        const decoded = unescape(res)
        return decoded
    })
}

//sudo gcloud functions deploy requestForCheckStatus --runtime nodejs8 --trigger-http