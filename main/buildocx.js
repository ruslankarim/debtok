function buildocx(e){
    var res = Responses.get(e)
    var functions = Config.cloudFunctions
    var inn = res['ИНН вашей компании (ИП)']
    var email = res['Укажите адрес своей электронной почты куда будут отправлены образцы сформированных документов'].replace(/\s/g, '')
    var sheet = SpreadsheetApp.openById(Config.idErrLogsSheet)
    var companyDadata = {data: Dadata.get('party', inn, Config.tokenDadata)}
    var company = CloudFunction.get(functions.baseUrl, functions.requestfordadata, companyDadata)
    var rootFolder = Config.buildocx
    var pretension = createFileFromTemplate(Config.templates.pretension.buildocxPretension,
                                            rootFolder,
                                            email + ' - образец претензии')
    var claim = createFileFromTemplate(Config.templates.pretension.buildocxClaim,
                                        rootFolder,
                                            email + ' - образец искового заявления')

    var contract = createFileFromTemplate(Config.templates.pretension.buildocxContract,
                                        rootFolder,
                                        email + ' - образец договора')

    const idRegion = company.kladr_id.substr(0,2)
    const region = getRegion(idRegion)
    const arbitr = getArbCourt(region)
    var bank = Dadata.get('bank', res['БИК банка'], Config.tokenDadata)
    var isOrg = company.isOrg
    var name = company.declinedName.genitive.last + ' ' + company.declinedName.genitive.first + ' '
                + company.declinedName.genitive.middle

    var sex = company.declinedName.genitive.gender  === 'male' ? 'действующего' : 'действующей'
    var side
    if(isOrg){
        side = company.full_with_opf + ' в лице ' + company.declinedPost.genitive + ' ' + name + ' ' + sex + ' на основании Устава, с одной стороны '
    }else {
        side = 'Индвидуальный предприниматель ' + company.fullName + ' ' + sex + ' от своего имени и в своих интересах '
    }


    var replace = {}

    replace.fullName = company.full_with_opf
    replace.inn = company.inn
    replace.ogrn = company.ogrn
    replace.address = company.address
    replace.currentDate = Utils.getCurrentDate()
    var splitDate = res['Дата договора'].split('-')
    replace.dateContract = splitDate[2] + '.' + splitDate[1] + '.' + splitDate[0]
    replace.numContract = res['Номер договора']
    replace.sumDebt = res['Сумма долга']
    replace.signatory = Utils.signatory(company)
    replace.inWords = num_letters(res['Сумма долга']) || ''
    replace.tax = calcTax(parseInt(res['Сумма долга']))
    replace.courtName = arbitr['наименование суда']
    replace.courtAddress = arbitr['адрес суда']
    replace.email = email
    replace.cityOrArea = company.cityOrArea
    replace.side = side
    replace.nameBank = bank.name.payment
    replace.bik = bank.bic
    replace.corrAccount = bank.correspondent_account

    replacement(replace, pretension)
    replacement(replace, claim)
    replacement(replace, contract)

    GmailApp.sendEmail(email, "Buildocx.ru - конструктор ваших документов", "Во вложении примеры документов, созданных исключительно для демонстрации работы приложения.", {
        attachments: [pretension.getBlob().getAs('application/pdf'),
            claim.getBlob().getAs('application/pdf'),
            contract.getBlob().getAs('application/pdf')]
    })

















    /*var firestore = FirestoreApp.getFirestore(Config.firestore.email,
        Config.firestore.key,
        Config.firestore.projectId)
    var isEmail = firestore.query('clients-buildocx/')
        .where('email', '==', email)
        .execute()
    if(isEmail.length > 0){
        var isCompany = firestore.query('clients-buildocx/' + email + '/companies/')
            .where('inn', '==', inn)
            .execute()
        if(isCompany.length > 0){

        }else{

        }
    }else{
        var client = {}
        var idFolderEmail = createFolder(Config.rootFolder, email)
        var idFolderCompany = createFolder(idFolderEmail, company.fullName)
        client.idFolderEmail = idFolderEmail
        company.idFolderCompany = idFolderCompany
        firestore.createDocument('clients-buildocx/' + email + '/', client)
        firestore.createDocument('clients-buildocx/' + email + '/companies/' + company.inn, company)


    }*/
}
