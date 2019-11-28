function updateFormCreateDeal(){
    var firestore = FirestoreApp.getFirestore(Config.firestore.email,
        Config.firestore.key,
            Config.firestore.projectId)
    var requestForClients = 'clients/'
    var clients = firestore.getDocuments(requestForClients)
    var obj = {}
    var arrEmails =[]
    var choices = []
    clients.forEach(function(el){
        arrEmails.push(el.fields.email)
    })

    clients.forEach(function (el) {
        var email = el.fields.email
        firestore
            .getDocuments(requestForClients + email + '/creditors')
                .forEach(function(el){

                    var fullName = el.fields.fullName
                    var inn = el.fields.inn
                    firestore
                        .getDocuments(requestForClients + email + '/creditors/' + inn + '/debtors')
                            .forEach(function(el){
                                var choice = email + ' > ' + fullName + ' - ' + el.fields.fullName + ': ' + el.fields.inn
                                choices.push(choice)
                            })
                })

    })
    var idFormCreateDeal = '1ZWuXpWyQ7nG72P-qZZjZ5ClQySKdY8zHVJodFqeih3s'
    function setChoices (arrOfChoices, idFormCreateDebtor) {
        var form = FormApp.openById(idFormCreateDebtor)
        var arrItems = form.getItems()
        var item
        for (var i = 0; i < arrItems.length; i++){
          if (arrItems[i].getTitle()=='Выберете кредитора и должника'){
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
      setChoices(choices, idFormCreateDeal)

    Logger.log(choices)
    

}

function createForm (){
    var form = FormApp.create('удалить');
    var selectCreditor = form.addPageBreakItem().setTitle('Кредитор')
    var firestore = FirestoreApp.getFirestore(Config.firestore.email,
        Config.firestore.key,
            Config.firestore.projectId)
    var requestForClients = 'clients/'
    var clients = firestore.getDocuments(requestForClients)
    clients.forEach(function (el) {
        
    })
    var pageThree = form.addPageBreakItem().setTitle('Page Three');
}