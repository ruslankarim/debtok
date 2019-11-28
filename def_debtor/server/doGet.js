//import getDataFromFssp from './getDataFromFSSP'

function doGet() {
  return HtmlService
      .createTemplateFromFile('index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getData(data){
    if(isClientExist(data.email)) {
        return {
            message: 'Похоже Вы у нас уже были, напишите нам сюда: debtok@buildocx.ru, для Вас будет создана отдельная форма',
            isClientExist: true
        }
    }else{
        const dadata = new CloudFunction(
            'https://us-central1-buildocx.cloudfunctions.net/',
            'handleDadata',
            data
            ).get()
        var toDb = {}
        const idFolderClient = createFolderClient(data.email).getId()
        const firestore = FirestoreApp.getFirestore (
                                                        Config.firestore.email,
                                                        Config.firestore.key,
                                                        Config.firestore.projectId
                                                    )
        toDb.idFolder = idFolderClient
        toDb.email = data.email
        toDb.debtor = dadata
        // firestore.createDocument("clients/", toDb)

        //2 мерный массив
        const dataFssp = getDataFromFssp({
            nameFull: dadata.full_with_opf,
            nameShort: dadata.opfShort + ' ' + dadata.fullName,
            region: dadata.kladr_id,
            isOrg: dadata.isOrg,
            address: dadata.cityOrArea
        })



        return {
            message: 'Проверьте почту',
            isClientExist: false,
        }
    }
}

function isClientExist(email) {
    var firestore = FirestoreApp.getFirestore(Config.firestore.email, Config.firestore.key, Config.firestore.projectId)
    var clients = firestore.query("clients/").where("email", "==", email).execute()
    if(clients.length !== 0){
        return true
    }else{
        return false
    }
}

function createFolderClient(email) {
    const rootFolder = DriveApp.getFolderById(Config.idFolderRoot)
    return rootFolder.createFolder(email)
}