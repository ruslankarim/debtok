/**
 * @param {object}
 */
function getDataFromFsspOrg(dadata) {
    var result
    var arrEnd = []
    var arrNotEnd = []
    var resultObject = {}

    //var resultShort
    const config = Config.cloudFunctions
    const region = dadata.kladr_id
    const address = dadata.cityOrArea
    const nameFull = /*dadata.full_with_opf*/ dadata.fullName
    //const nameShort = dadata.fullName
    //const nameShort = dadata.opfShort + ' ' + dadata.fullName
    const isOrg = dadata.isOrg
    //const dataShort = {name: nameShort, region: region, isOrg: isOrg, address: address}
    const data = {isOrg: isOrg, region: region, data: {name: nameFull, address: address}}
    const fsspTask = fssp(config.baseUrl, config.requestfortask, data)
    //const fsspTaskShort = fssp(config.baseUrl, config.requestfortask, dataShort)
    const isCompleteRequestFsspTask = checkStatusRequest(fsspTask, config)
    //const isCompleteRequestFsspTaskShort = checkStatusRequest(fsspTaskShort, config)
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

    /*if(isCompleteRequestFsspTaskShort.isCompleteRequest){
        resultShort = fssp(config.baseUrl, config.requestforresult, {taskId: fsspTask.response.task})
        resultShort.response.result[0].result.forEach(function (el) {
            Logger.log(el)
        })
    }*/




}

function fssp(baseUrl, nameFunction, data){
    var result
    result = new CloudFunction(baseUrl, nameFunction, data).get()
    return result
}

function checkStatusRequest(fsspTask, config) {
    var isCompleteRequest,
        dataTask,
        result,
        resultShort
    if(fsspTask.status === 'success'){
        dataTask = {taskId: fsspTask.response.task}
        isCompleteRequest = fssp(config.baseUrl, config.requestforcheckstatus, dataTask)
        if(isCompleteRequest.response.status === 1 || isCompleteRequest.response.status === 2){
            wait(1500)
            for(var i = 0; i < 25; i++){
                Logger.log('Внутри цикла: ' + isCompleteRequest.response.status)
                isCompleteRequest = fssp(config.baseUrl, config.requestforcheckstatus, dataTask)
                if(isCompleteRequest.response.status === 0 || isCompleteRequest.response.status === 3){
                    return {isCompleteRequest : true}
                }
                wait(500)
            }
            return {isCompleteRequest : false}

        }else {
            return {
                isCompleteRequest : true
            }
        }

    }else{
        return {
            isCompleteRequest : false
        }
    }
}