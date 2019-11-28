const { constants } = require('../constants')
const rp = require('request-promise')

exports.requestForCheckStatus = (req, res) => {
    const {taskId} = req.body
    console.log(taskId)
    requestForCheckStatus(taskId).then((result) => {
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
