/**
 * @param {string} имя базового http адреса cloud function.
 * @param {string} имя функции
 * @param {object} данные для обработки передаваемые в cloud function
 * @return {object} результат обработки
 */
function CloudFunction(baseUrl, nameFunction, data) {
    this._baseUrl = baseUrl
    this._nameFunction = nameFunction
    this._data = data

    this.get = function (){
        const url = this._baseUrl + this._nameFunction
        const data = JSON.stringify(this._data)
        const options = {
            'method' : 'post',
            'contentType': 'application/json',
            'payload': data
        }
        var res
        try {
            res = UrlFetchApp.fetch(url, options).getContentText()
        }catch (e) {
            Logging.execute(Config.errLogsSShet, e)
        }
        return JSON.parse(res)
    }
}