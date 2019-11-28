
export default class CallerCloudFunctionFsspCheckRequest{

    constructor(private baseUrl: string, private data: object){}

    get(): {
        status: string,
        code: number,
        exception: string,
        response: {task: string}
    }{
        const url = `${this.baseUrl}requestForCheckStatus`
        Logger.log(url)
        const data = JSON.stringify(this.data)
        const options = {
            'contentType': 'application/json',
            'payload': data
        }
        const text = UrlFetchApp.fetch(url, options).getContentText()
        return JSON.parse(text)
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