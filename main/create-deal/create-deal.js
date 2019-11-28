function createDeal(e){
    var debtor
    var res = Responses.get(e)
    var titleForm = e.source.getTitle()
    var innDebtor = res['ИНН должника']
    var innCreditor = res['Кредитор'].split(': ')[1]
    var emailClient = res['Кредитор'].split(' > ')[0]
    var nameCreditor = res['Кредитор'].split(' > ')[1].split(', ИНН: ')[0]

    var firestore = FirestoreApp.getFirestore(Config.firestore.email,
                                                Config.firestore.key,
                                                    Config.firestore.projectId)
    var requestForDebtors = 'clients/' + emailClient + '/creditors/' + innCreditor + '/debtors/'
    var debtors = firestore.query(requestForDebtors).where('inn', '==', innDebtor).execute()
    if(debtors.length === 0){
        GmailApp.sendEmail(Config.emails.admin,
                            Config.messages.isDebtorNotExist.toEmail.subject,
                                Config.messages.isDebtorNotExist.toEmail.body)
    }else if(typeof debtors[0]=== 'object'){
        debtor = debtors[0].fields
        var nameFolderDeal = nameCreditor + ' к ' + debtor.fullName + ', ИНН: '+ debtor.inn + ', основной долг: ' + res['Сумма основного долга']
        var idRootFolder = debtor.folder
        var idFolderDeal = createFolder(idRootFolder, nameFolderDeal)
        res.folder = idFolderDeal
        var requestForWriteDeal = 'clients/' + emailClient + '/creditors/' + innCreditor + '/debtors/' + debtor.inn + '/deals/' + nameFolderDeal
        firestore.createDocument(requestForWriteDeal, res)
        firestore.createDocument('deals/', {idDeal: nameFolderDeal})

        var debts = firestore.getDocuments('deals')
        var choices = []
        debts.forEach(function(el){
            choices.push(el.fields.idDeal)
        })
        function setChoices (arrOfChoices, idFormCreateDebtor) {
            var form = FormApp.openById(idFormCreateDebtor)
            var arrItems = form.getItems()
            var item
            for (var i = 0; i < arrItems.length; i++){
              if (arrItems[i].getTitle()=='Выберете задолженность'){
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
         setChoices(choices, Config.forms['Документы'])
    }

}