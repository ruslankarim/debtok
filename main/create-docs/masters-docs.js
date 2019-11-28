var mastersDocs = {}
mastersDocs['Претензия'] = function(data){
    var innCreditor = data['Кредитор'].split(': ')[1]
    var emailClient = data['Кредитор'].split(' > ')[0]
    var nameCreditor = data['Кредитор'].split(' > ')[1].split(': ')[0]
    var nameFolder = data['Выберете задолженность']
    var innDebtor = nameFolder.split(': ')[1].split(', ')[0]
    var requestForDeal = 'clients/' + emailClient 
                                    + '/creditors/' 
                                    + innCreditor
                                    + '/debtors/'
                                    + innDebtor
                                    + '/deals/'
                                    + nameFolder
    var requestForCreditor = 'clients/' + emailClient 
                                        + '/creditors/' 
                                        + innCreditor

    var requestForDebtor = requestForCreditor + '/debtors/'
                                              + innDebtor
    var firestore = FirestoreApp.getFirestore(Config.firestore.email,
                                                Config.firestore.key,
                                                    Config.firestore.projectId)
    var deal = firestore.getDocument(requestForDeal).fields
    var creditor = firestore.getDocument(requestForCreditor).fields
    var debtor = firestore.getDocument(requestForDebtor).fields
    var nameFile = 'Претензия ' + nameFolder
    var idTemplate = Config.templates.pretension.common
    var folder = deal.folder
    var file = createFileFromTemplate(idTemplate, folder, nameFile)
    var replace = templatesPretension.common
    replace.fullNameDebtor = debtor.full_with_opf
    replace.INNDebtor = debtor.inn
    replace.addressDebtor = debtor.address
    replace.fullNameCreditor = creditor.full_with_opf
    replace.INNCreditor = creditor.inn
    replace.addressCreditor = creditor.address
    replace.sumDebt = deal['Сумма основного долга']
    var splitDate = deal['Дата договора'].split('-')
    replace.dateContract = splitDate[2] + '.' + splitDate[1] + '.' + splitDate[0]
    replace.currentDate = Utils.getCurrentDate()
    replace.numContract = deal['№ Договора']
    replace.signatory = Utils.signatory(creditor)
    replacement(replace, file)
}

mastersDocs['Претензия по договору перевозки груза'] = function (data) {
    var innCreditor = data['Кредитор'].split(': ')[1]
    var emailClient = data['Кредитор'].split(' > ')[0]
    var nameCreditor = data['Кредитор'].split(' > ')[1].split(': ')[0]
    var nameFolder = data['Выберете задолженность']
    var innDebtor = nameFolder.split(': ')[1].split(', ')[0]
    var requestForDeal = 'clients/' + emailClient
        + '/creditors/'
        + innCreditor
        + '/debtors/'
        + innDebtor
        + '/deals/'
        + nameFolder
    var requestForCreditor = 'clients/' + emailClient
        + '/creditors/'
        + innCreditor

    var requestForDebtor = requestForCreditor + '/debtors/'
        + innDebtor
    var firestore = FirestoreApp.getFirestore(Config.firestore.email,
        Config.firestore.key,
        Config.firestore.projectId)
    var deal = firestore.getDocument(requestForDeal).fields
    var creditor = firestore.getDocument(requestForCreditor).fields
    var debtor = firestore.getDocument(requestForDebtor).fields
    var nameFile = 'Претензия ' + nameFolder
    var idTemplate = Config.templates.pretension.cargo
    var folder = deal.folder
    var file = createFileFromTemplate(idTemplate, folder, nameFile)
    var replace = templatesPretension.cargo
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
    replace.track = deal['Куда'] !== '' && deal['Откуда'] !== '' ? ', по маршруту: ' + deal['Откуда'] + ' - ' + deal['Куда'] : ''
    replace.sourceDocuments = deal['Список первичиных документов'] !== '' ? ', что подтверждается следующими документами: ' + deal['Список первичиных документов'] : ''
    replace.signatory = Utils.signatory(creditor)
    replacement(replace, file)
}

