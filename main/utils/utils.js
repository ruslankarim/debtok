var Utils = {}
Utils.getCurrentDate = function(){
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth()+1 //January is 0!
    var yyyy = today.getFullYear()

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    return dd + '.' + mm + '.' + yyyy
}

Utils.signatory = function (data) {
    var signatory
    var isOrg = data.isOrg
    if(!isOrg){
        var position = data.opfFull
        var arrName = data.fullName.split(' ')
        if(arrName.length !== 3){
            signatory = position + '\n' + data.fullName
        }else if (arrName.length === 3){
            signatory = position + '\n' + _initials(arrName)
        }
    } else if (isOrg && data.isManager && data.manageCompany.isOrg){
        var arrName = data.manageCompany.managementName.split(' ')
        var position = data.manageCompany.managementPost.toLowerCase() + '\n' + 'управляющей компании'
        if(arrName.length !== 3){
            signatory = position + '\n' + data.manageCompany.managementName
        }else if (arrName.length === 3){
            signatory = position + '\n' + _initials(arrName)
        }
    } else if(isOrg && data.isManager && !data.manageCompany.isOrg){

    } else if(isOrg, !data.isManager){
        var post = data.managementPost.toLowerCase()
        var position = post.charAt(0).toUpperCase() + post.slice(1)
        var arrName = data.managementName.split(' ')
        if(arrName.length !== 3){
            signatory = position + '\n' + data.managementName
        }else if (arrName.length === 3){
            signatory = position + '\n' + _initials(arrName)
        }
    }
    return signatory
}

function _initials(arrName){
    var lastName = arrName[0].charAt(0).toUpperCase() +
        arrName[0].slice(1)
    var name = arrName[1].charAt(0).toUpperCase()
    var patronymic = arrName[2].charAt(0).toUpperCase()
    return name + '.' + patronymic + '. ' + lastName
}