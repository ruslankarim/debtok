/**
 * @param {string} email введенный пользователем.
 * @param {object} instance Firestore
 * @return {boolean} есть ли в базе данных запись с таким email
 */

function isClientExist(email, firestore){
    var clients
    try {
        clients = firestore.query("clients/").where("email", "==", email).execute()
    }catch (e) {
        Logging.execute(Config.errLogsSShet, e)
    }
    if(clients.length !== 0){
        return true
    }else{
        return false
    }
}