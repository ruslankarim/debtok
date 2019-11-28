function createClient(e) {
    var res,
    inn,
    bik,
    rs,
    innManager,
    functions,
    isOrg,
    isManager,
    isManageCompany,
    dadata,
    clientManager,
    dadataBank,
    dadataManager,
    firestore,
    clients,
    client,
    clientInfo,
    creditor,
    toDb,
    idFormCreateDebtor,
    folderData,
    allDocuments,
    arrOfChoices,
    choice,
    idFormCreateDeal,
    responseUrl,
    titleForm,
    incorrectData,
    email

  res = Responses.get(e)
  titleForm = e.source.getTitle()
  functions = Config.cloudFunctions
  inn = res['ИНН организации'].replace(/\s/g, '') || res['ИНН индивидуального предпринимателя'].replace(/\s/g, '')
  isOrg = res['Категория клиента'] === 'Организация' ? true : false
  isManager = res['Полномочия исполнительного органа переданы управляющему?']==='Да' ?
              innManager = res['ИНН - управляющего (управляющей организации)'] :
              false
  var sheet = SpreadsheetApp.openById(Config.idErrLogsSheet)
    
  if(!Validate.inn(inn)){
    GmailApp.sendEmail(Config.emails.admin,
                         Config.messages.innClientIsInCorrect.toEmail.subject,
                         Config.messages.innClientIsInCorrect.toEmail.body + e.response.getEditResponseUrl()
                      )
    throw new Error(Config.messages.innClientIsInCorrect.toErrLog + inn)
  }
  try{
    dadata = {data: Dadata.get('party', inn, Config.tokenDadata)}
  }catch(err){
    GmailApp.sendEmail(Config.emails.admin,
                         Config.messages.innClientDadata.toEmail.subject,
                         Config.messages.innClientDadata.toEmail.body + e.response.getEditResponseUrl()
                       )
    Logging.execute(sheet, err)
    return
  }

  client = CloudFunction.get(functions.baseUrl, functions.requestfordadata, dadata)
  if(!isOrg) client.address = res['Адрес места жительства']

  if(isManager){
    if(!Validate.inn(innManager)){
      GmailApp.sendEmail(Config.emails.admin,
                        Config.messages.innManagerIsInCorrect.toEmail.subject,
                        Config.messages.innManagerIsInCorrect.toEmail.body + e.response.getEditResponseUrl()
                        )
      throw new Error(Config.messages.innClientIsInCorrect.toErrLog + innManager)
    }
    try{
        dadataManager = {data: Dadata.get('party', innManager, Config.tokenDadata)}
    }catch(err){
    Logging.execute(sheet, err)
        return
    }
    client.manageCompany = CloudFunction.get(functions.baseUrl, functions.requestfordadata, dadataManager)
    client.isManager = true
  }

  email = res['Email'].replace(/\s/g, '')

  try{
        firestore = FirestoreApp.getFirestore(Config.firestore.email,
                                                Config.firestore.key,
                                                    Config.firestore.projectId)

        creditor = firestore.query('clients/' + email + '/creditors/').where('inn', '==', inn).execute()
        clients = firestore.query('clients/').where('email', '==', email).execute()
        if(creditor.length > 0){
        GmailApp.sendEmail(Config.emails.admin,
                            Config.messages.isCreditorExist.toEmail.subject,
                            Config.messages.isCreditorExist.toEmail.body
                            )
        } else if(clients.length > 0){
            var toDb = {}
            var needUpdate = clients[0].fields
            toDb.email = needUpdate.email
            toDb.folder = needUpdate.folder
            var idRootFolder = toDb.folder
            var idFolderCreditor = createFolder(idRootFolder, client.fullName)
            client.folder = idFolderCreditor
            tempTel = res['Телефон'] !== '' ? toDb.tel = res['Телефон'] : ''
            tempSite = res['Адрес сайта'] !== '' ? toDb.site = res['Адрес сайта'] : ''
            firestore.updateDocument("clients/" + email + '/', toDb)
            Logger.log('106 '+ client.address)
            firestore.createDocument("clients/" + email + '/creditors/' + inn, client)
        } else if(clients.length === 0) {
            var toDb = {}
            var idFolderClient = createFolder(Config.rootFolder, email)
            var idFolderCreditor = createFolder(idFolderClient, client.fullName)
            client.folder = idFolderCreditor
            toDb.folder = idFolderClient
            toDb.email = email
            tempTel = res['Телефон'] !== '' ? toDb.tel = res['Телефон'] : ''
            tempSite = res['Адрес сайта'] !== '' ? toDb.site = res['Адрес сайта'] : ''
            firestore.createDocument("clients/" + email + '/', toDb)
            firestore.createDocument("clients/" + email + '/creditors/' + inn, client)
        }
    }catch(e) {
        Logging.execute(sheet, e)
  }
    var choices = choiceEmailCreditor(firestore)

  idFormCreateDebtor = Config.forms['Создание должника']//todo определять с какой формой работает скрипт
  idFormCreateDeal = Config.forms['Создание дела']
  var idFormDocs = Config.forms['Документы']
  function setChoices (arrOfChoices, idFormCreateDebtor) {
      var form = FormApp.openById(idFormCreateDebtor)
      var arrItems = form.getItems()
      var item
      for (var i = 0; i < arrItems.length; i++){
        if (arrItems[i].getTitle()=='Кредитор'){
          item = arrItems[i]
        }
      }
      var textItem = item.asListItem()
      var choices = []
      for (var i = 0; i < arrOfChoices.length; i++){
        choices.push(textItem.createChoice(arrOfChoices[i]))
      }
      textItem.setChoices(choices)
   }
    setChoices(choices, idFormCreateDebtor)
    setChoices(choices, idFormCreateDeal)
    setChoices(choices, idFormDocs)
}