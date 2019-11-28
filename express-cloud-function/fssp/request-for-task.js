const rp = require("request-promise")
const {constants} = require('../constants')

exports.requestForTask = (req, res, next) => {

    const { isOrg, data, region} = req.body
    const isLegal = isOrg ? '/search/legal' : '/search/physical'
    const firstSymbol = region[0]
    var indRegion
    if(parseInt(firstSymbol) === 0){
        indRegion = region.slice(1, 2)
    }else {
        indRegion = region.slice(0, 2)
    }

    var url
    if (isOrg) {
        const {name, address} = data
        url = constants.baseUrl + isLegal + '?'
            + 'token=' + constants.keyFSSP
            + '&' + 'region=' + indRegion
            + '&' + 'name=' + name
            + '&' + 'address=' + address
    }
    if(!isOrg){
        const { firstName, lastName, secondName } = data
        url = `${constants.baseUrl}${isLegal}?token=${constants.keyFSSP}&region=
               ${indRegion}&lastname=${lastName}&firstname=${firstName}&secondname=${secondName ? secondName: ''}`

    }
    const encodedUrl = encodeURI(url)
    rp(encodedUrl).then((task) => {
        res.send(task)
    })
}