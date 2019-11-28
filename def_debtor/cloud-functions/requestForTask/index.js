const { constants } = require('./constants')
const rp = require("request-promise")

exports.getDataFSSP = (req, res) => {

    const {name, region, isOrg, address} = req.body

    requestForTask(name, region, isOrg, address)
        .then((task) => {
            res.send(task)
        })
    /*
    .then((result) => {
        res.send(JSON.stringify(result))
        /*
        const results = result.response.result[0].result
        if(results !== null){
            let arrr = []
            results.forEach(function (el) {
                let arr = []
                arr.push(el.name)
                arr.push(el.exe_production)
                arr.push(el.department)
                arrr.push(arr)

                if(el.ip_end === ''){

                }
            })
            let obj = {}
            if(arrr.length === 0) {
                res.send(JSON.stringify({results: null}))
            }else{
                obj.results = arrr
                res.send(JSON.stringify(obj))
            }

        }else{
            res.send(JSON.stringify({results: null}))
        }

   })
}
*/
}

    const requestForTask = (name, region, isOrg, address) => {
        const isLegal = isOrg ? '/search/legal' : '/search/physical'
        const indRegion = region.slice(0, 2)
        var url
        if (isOrg) {
            url = constants.baseUrl + isLegal + '?'
                + 'token=' + constants.keyFSSP
                + '&' + 'region=' + indRegion
                + '&' + 'name=' + name
                + '&' + 'address=' + address
        }
        const encodedUrl = encodeURI(url)
        return rp(encodedUrl).then((task) => {
            return task
        })
    }

    // const requestForResult = (task) => {
    //     const url = constants.baseUrl + '/result?task=' + task + '&' + 'token=' + constants.keyFSSPBuildocx
    //     const encodedUrl = encodeURI(url)
    //     return rp(encodedUrl).then((res) => {
    //         const decoded = unescape(res)
    //         const jsonParsed = JSON.parse(decoded)
    //         return jsonParsed
    //     })
    // }
