function createDebtor(e){
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
    debtors,
    debtor,
    clientInfo,
    creditors,
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
    email,
    innCreditor

res = Responses.get(e)
titleForm = e.source.getTitle()
functions = Config.cloudFunctions
inn = res['ИНН организации'].replace(/\s/g, '') || res['ИНН индивидуального предпринимателя'].replace(/\s/g, '')
isOrg = res['Категория должника'] === 'Организация' ? true : false
  isManager = res['Полномочия исполнительного органа переданы управляющему?']==='Да' ?
              innManager = res['ИНН - управляющего (управляющей организации)'] :
              false
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
    Logging.execute(Config.idErrLogsSheet, err)
    return
  }

debtor = CloudFunction.get(functions.baseUrl, functions.requestfordadata, dadata)
if(!isOrg) debtor.address = res['Адрес места жительства ']

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
    Logging.execute(Config.idErrLogsSheet, err)
        return
    }
    debtor.manageCompany = CloudFunction.get(functions.baseUrl, functions.requestfordadata, dadataManager)
    debtor.isManager = true
  }

  innCreditor = res['Кредитор'].split(': ')[1]
  emailCreditor = res['Кредитор'].split(' > ')[0]
  try{
        firestore = FirestoreApp.getFirestore(Config.firestore.email,
                                                Config.firestore.key,
                                                    Config.firestore.projectId)
        var request = 'clients/' + emailCreditor + '/creditors/' + innCreditor + '/debtors/'
        debtors = firestore.query(request).where('inn', '==', debtor.inn).execute()
        if(debtors.length > 0){
        GmailApp.sendEmail(Config.emails.admin,
                            Config.messages.isCreditorExist.toEmail.subject,
                            Config.messages.isCreditorExist.toEmail.body
                            )
          }else{
            toDb = {}
            var idRootFolder = firestore.getDocument('clients/' + emailCreditor + '/creditors/' + innCreditor).fields.folder
            debtor.folder = createFolder(idRootFolder, debtor.fullName)
            tempTel = res['Телефон'] !== '' ? debtor.tel = res['Телефон'] : ''
            tempSite = res['Адрес сайта'] !== '' ? debtor.site = res['Адрес сайта'] : ''
            tempEmail = res['Email'] !== '' ? debtor.email = res['Email'].replace(/\s/g, '') : ''
            firestore.createDocument("clients/" + emailCreditor + '/creditors/' + innCreditor + '/debtors/' + debtor.inn, debtor)
        }
    }catch(e) {
        var sheet = SpreadsheetApp.openById(Config.idErrLogsSheet)
        Logging.execute(sheet, e)
  }

}

