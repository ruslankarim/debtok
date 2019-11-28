const { constants } = require('../constants')
const rp = require('request-promise')

exports.requestForResult = (req, res) => {
    const {taskId} = req.body
    requestForResult(taskId).then((result) => {
        console.log(result)
        res.send(result)
    })
}

const requestForResult = (task) => {
    const url = constants.baseUrl + '/result?task=' + task + '&' + 'token=' + constants.keyFSSPBuildocx
    const encodedUrl = encodeURI(url)
    return rp(encodedUrl).then((res) => {
        return res
    })
}
