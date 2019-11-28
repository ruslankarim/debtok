const { constants } = require('./constants')
const rp = require('request-promise')

exports.requestForResult = (req, res) => {
    const {task} = req.body
    requestForResult(task).then((result) => {
        res.send(JSON.stringify(result))
    })
}

const requestForResult = (task) => {
    const url = constants.baseUrl + '/result?task=' + task + '&' + 'token=' + constants.keyFSSPBuildocx
    const encodedUrl = encodeURI(url)
    return rp(encodedUrl).then((res) => {
        const decoded = unescape(res)
        return decoded
    })
}