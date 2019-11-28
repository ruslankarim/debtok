//todo переименовать функцию на frontе и здесь. например reportDebtor

function getData(data) {
    var firestore,
        dadata,
        dataFssp

    try{
        firestore = FirestoreApp.getFirestore(Config.firestore.email,
                                                Config.firestore.key,
                                                    Config.firestore.projectId)
    }catch (e) {
        Logging.execute(Config.errLogsSShet, e)
    }

    if (isClientExist(data.email, firestore)) return {message : 'Похоже Вы у нас уже были, напишите нам сюда: order@debtok.ru, для Вас будет создана отдельная форма'}

    try{
        dadata = new CloudFunction(Config.cloudFunctions.baseUrl,
                                   Config.cloudFunctions.requestfordadata,
                                   data).get()
    }catch (e) {
        Logging.execute(Config.errLogsSShet, e)
    }

    if(dadata.isOrg){
        dataFssp = getDataFromFsspOrg(dadata)
    }else if(!dadata.isOrg){
        dataFssp = getDataFromFsspIp(dadata)
    }else{

    } 
      const idRegion = dadata.kladr_id.substr(0,2)
      const region = getRegion(idRegion)
      Logger.log(region)
      const arbitr = getArbCourt(region)
      const idFolder = createFolder(Config.idFolderRoot, data.email)
      const idFolderDebtor = createFolder(idFolder, dadata.fullName)
      var toDB = {}
      toDB.folder = idFolder
      toDB.email = data.email.toLowerCase()
      dadata.folder = idFolderDebtor
      const template = dadata.isOrg ? Config.idPretensionOrg : Config.idPretensioIP
      const templateClaim = dadata.isOrg ? Config.idClaimOrg : Config.idClaimOrg
      const pretension = createFileFromTemplate(template, idFolderDebtor,
                                            'Претензия ' + dadata.fullName)
      const claim = createFileFromTemplate(templateClaim, idFolderDebtor,
                                            'Исковое заявление ' + dadata.fullName)
      const reportExecution = createFileFromTemplate(Config.reportExecution, idFolderDebtor,
                                            'Отчет об исполнительных производствах ' + dadata.fullName)
      var replace = {}
      var replaceReport = {}

      replace.fullNameDebtor = dadata.full_with_opf
      replace.INNDebtor = dadata.inn
      replace.addressDebtor = dadata.address
      replace.currentDate = Utils.getCurrentDate()
      replace.courtName = arbitr['наименование суда']
      replace.courtAddress = arbitr['адрес суда']
      replace.OGRNDebtor = dadata.ogrn

      replaceReport.fullNameDebtor = dadata.full_with_opf
      replaceReport.INNDebtor = dadata.inn
      replaceReport.addressDebtor = dadata.address
      replaceReport.OGRNDebtor = dadata.ogrn
      replaceReport.currentDate = replace.currentDate
      
      var tableNotEnd = dataFssp.notEnd.length > 0 ? dataFssp.notEnd :
                        [['Не обнаружено']]
      var tableEnd = dataFssp.end.length > 0 ? dataFssp.end :
                        [['Не обнаружено']]
      
      var documentReport = DocumentApp.openById(reportExecution.getId())
      var bodyReport = documentReport.getBody()
      bodyReport.insertTable(9, tableNotEnd)
      bodyReport.insertTable(13, tableEnd)
      documentReport.saveAndClose()

      replacement(replace, pretension)
      replacement(replace, claim)
      replacement(replaceReport, reportExecution)
      
      firestore.createDocument("clients/" + toDB.email + '/', toDB)
       firestore.createDocument("clients/" + toDB.email + '/debtors/' + dadata.inn, dadata)
      /*MailApp.sendEmail(
        {to: data.email,
         subject: "Отчет о Вашем должнике готов, и не только он",
         htmlBody: HtmlService.createHtmlOutputFromFile('promoHTML').getContent(),
         attachments: [pretension.getBlob().getAs('application/pdf'),
                             reportExecution.getBlob().getAs('application/pdf'),
                                        claim.getBlob().getAs('application/pdf')]
        });
  */
       GmailApp.sendEmail(data.email, "Отчет о Вашем должнике готов, и не только он", "", {
         htmlBody: HtmlService.createHtmlOutputFromFile('promoHTML').getContent(),
         attachments: [pretension.getBlob().getAs('application/pdf'),
                             reportExecution.getBlob().getAs('application/pdf'),
                                        claim.getBlob().getAs('application/pdf')]
        })

    const defaultResponse = {
        message: 'Посмотрите указанную Вами почту: ' + data.email,
    }

    return defaultResponse
}

