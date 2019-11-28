function choiceEmailCreditor(firestore){
    var choices = []
    firestore.getDocuments('clients/')
        .forEach(function (el) {
        var email = el.fields.email
        firestore.getDocuments('clients/' + email + '/creditors/')
            .forEach(function (el) {
            choices.push(email + ' > ' + el.fields.fullName + ', ИНН: ' + el.fields.inn)
        })
    })
    return choices.sort()
}