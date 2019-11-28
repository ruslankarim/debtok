function getDataFromFsspIp(dadata) {
    var result
    var arrEnd = []
    var arrNotEnd = []
    var resultObject = {}

    const config = Config.cloudFunctions
    const region = dadata.kladr_id
    const nameFull = dadata.fullName
    const data = prepareName(nameFull)
    const request = {isOrg: dadata.isOrg, region: region, data: data}
    const fsspTask = fssp(config.baseUrl, config.requestfortask, request)
    const isCompleteRequestFsspTask = checkStatusRequest(fsspTask, config)
    if(isCompleteRequestFsspTask.isCompleteRequest){
        result = fssp(config.baseUrl, config.requestforresult, {taskId: fsspTask.response.task})

        result.response.result[0].result.forEach(function (el) {
            if(el.ip_end === ''){
                var arr = []
                arr.push(el.details)
                arr.push(el.exe_production)
                arr.push(el.department)
                arrNotEnd.push(arr)
            }
            if(el.ip_end !== ''){
                var arr = []
                arr.push(el.ip_end)
                arr.push(el.details)
                arr.push(el.exe_production)
                arr.push(el.department)
                arrEnd.push(arr)
            }
        })
        resultObject.end = arrEnd
        resultObject.notEnd = arrNotEnd
        return resultObject
    }else{
      Logger.log('Cервер не ответил')
      resultObject.end = []
      resultObject.notEnd = []
      return resultObject
    }

}

function prepareName(nameFull) {
    const arr = nameFull.split(' ')
    if(arr.length < 3){
        return {firstName: arr[1], lastName: arr[0]}
    }else if(arr.length === 3){
        return {firstName: arr[1], lastName: arr[0], secondName: arr[2]}
    }


}
