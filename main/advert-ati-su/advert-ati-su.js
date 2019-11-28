function advertAtiSu(e){
    var res = Responses.get(e)
    var functions = Config.cloudFunctions
    var innCreditor = res['ИНН кредитора (кому должны)']
    var innDebtor = res['ИНН должника']
    var email = res['Email'].replace(/\s/g, '')
    var sheet = SpreadsheetApp.openById(Config.idErrLogsSheet)
    var dadataCreditor = {data: Dadata.get('party', innCreditor, Config.tokenDadata)}
    var dadataDebtor = {data: Dadata.get('party', innDebtor, Config.tokenDadata)}
    var creditor = CloudFunction.get(functions.baseUrl, functions.requestfordadata, dadataCreditor)
    var debtor = CloudFunction.get(functions.baseUrl, functions.requestfordadata, dadataDebtor)
    var firestore = FirestoreApp.getFirestore(Config.firestore.email,
                                                Config.firestore.key,
                                                    Config.firestore.projectId)
    var isClient = firestore.query('clients/')
                                .where('email', '==', email)
                                    .execute()
    var isCreditor
    var isDebtor
    var idFolderClient, idFolderCreditor, idFolderDebtor, idFolderDeal
    var toDb
    var deal
    var idDeal
    if(isClient.length > 0){
        isCreditor = firestore.query('clients/' + email + '/creditors/')
                                .where('inn', '==', innCreditor)
                                    .execute()
        if(isCreditor.length > 0){
            isDebtor = firestore.query('clients/' + email + '/creditors/' + innCreditor + '/debtors/')
                                    .where('inn', '==', innDebtor)
                                        .execute()
            if(isDebtor.length > 0){

            }

        }
        GmailApp.sendEmail(Config.emails.admin,
            Config.messages.isClientExistAtiSu.toEmail.subject + email,
            Config.messages.isClientExistAtiSu.toEmail.body + email
        )
        return
    }else {
        toDb = {}
        deal = {}
        idDeal = creditor.fullName + ' к ' + debtor.fullName + ', ИНН: ' + debtor.inn + ', основной долг: ' + res['Сумма основного долга']
        idFolderClient = createFolder(Config.rootFolder, email)
        idFolderCreditor = createFolder(idFolderClient, creditor.fullName)
        idFolderDebtor = createFolder(idFolderCreditor, debtor.fullName)
        idFolderDeal = createFolder(idFolderDebtor, idDeal)
        deal.folder = idFolderDeal
        creditor.folder = idFolderCreditor
        debtor.folder = idFolderDebtor
        deal.idDeal = idDeal
        toDb.folder = idFolderClient
        toDb.email = email
        deal['№ Договора'] = res['№ Договора']
        deal['Дата договора'] = res['Дата договора']
        deal['Сумма основного долга'] = res['Сумма основного долга']
        deal['Маршрут'] = res['Маршрут']
        firestore.createDocument("clients/" + email + '/', toDb)
        firestore.createDocument("clients/" + email + '/creditors/' + innCreditor, creditor)
        firestore.createDocument("clients/" + email + '/creditors/' + innCreditor + '/debtors/' + innDebtor, debtor)
        firestore.createDocument("clients/" + email + '/creditors/' + innCreditor + '/debtors/' + innDebtor + '/deals/' + idDeal, deal )
        var idTemplate = Config.templates.pretension.cargoAtiSu
        var folder = deal.folder
        var file = createFileFromTemplate(idTemplate, folder, idDeal)
        var replace = {}
        replace.fullNameDebtor = debtor.full_with_opf
        replace.innDebtor = debtor.inn
        replace.addressDebtor = debtor.address
        replace.fullNameCreditor = creditor.full_with_opf
        replace.innCreditor = creditor.inn
        replace.addressCreditor = creditor.address
        replace.sumDebt = deal['Сумма основного долга']
        var splitDate = deal['Дата договора'].split('-')
        replace.dateContract = splitDate[2] + '.' + splitDate[1] + '.' + splitDate[0]
        replace.currentDate = Utils.getCurrentDate()
        replace.numContract = deal['№ Договора']
        replace.track = ',  по маршруту: ' + deal['Маршрут']
        replace.sourceDocuments = ''
        replace.signatory = Utils.signatory(creditor)
        replacement(replace, file)
        GmailApp.sendEmail(
             email,
            'Для ' + creditor.fullName,
            advertMassage.atiSu,
            {attachments: [file.getBlob().getAs('application/pdf')]})
    }
}