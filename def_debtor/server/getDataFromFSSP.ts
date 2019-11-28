import CallerCloudFunctionFsspTask from './caller-cloud-function/caller-cloud-function-fssp-task'
import CallerCloudFunctionFsspCheckRequest from './caller-cloud-function/caller-cloud-function-fssp-check-request'
import constants from './caller-cloud-function/constats-cloud-function'
import runOnObject from "./runOnObject"



function getDataFromFssp(obj) {
    const { isOrg, nameFull, nameShort, region, address } = obj
    const {urlCloudFunction} = constants
    if(isOrg){
        const fsspTask = new CallerCloudFunctionFsspTask(
            urlCloudFunction,
            {
                nameFull,
                region,
                isOrg,
                address
            })
            .get()

        const fsspOpfShortTask = new CallerCloudFunctionFsspTask(
            urlCloudFunction,
            {
                nameShort,
                region,
                isOrg,
                address
            })
            .get()
        Logger.log('fsspTask---' + fsspTask.response.task)
        const isValidRequestFsspTask = new CallerCloudFunctionFsspCheckRequest(
            urlCloudFunction,
            {
                taskId: fsspTask.response.task
            }
        ).get()

        Logger.log(isValidRequestFsspTask)




    }

}



// {
//     "status": "success",
//     "code": 0,
//     "exception": "",
//     "response": {
//     "task": "BDAB49B2-F435-49CC-80DF-55F2F57D3057"
// }
// }