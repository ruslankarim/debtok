export default class CloudFunction {

    constructor(protected baseUrl: string,
                protected nameFunction: string,
                protected data: object){

    }
    get(): object{
        const url = `${this.baseUrl}${this.nameFunction}`
        const data = JSON.stringify(this.data)
        const options = {
            'contentType': 'application/json',
            'payload': data
        }
        const res = UrlFetchApp.fetch(url, options).getContentText()
        return JSON.parse(res)
    }
}

