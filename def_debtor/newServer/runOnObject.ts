export default function runOnObject(object: object) {
    Logger.log('runOnObject: ' + typeof object)
    for (let key in object){
        Logger.log('runOnObject: ' + object)
        Logger.log(key + ': ' + object[key])
    }
}