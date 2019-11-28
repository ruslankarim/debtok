const petrovich = require('petrovich')

exports.requestForDadata = function (req, res) {
    let resData = {}
    const data = req.body.data
    resData.address = data.address.unrestricted_value || data.address.value
    resData.ogrn = data.ogrn
    resData.inn = data.inn
    resData.kpp = data.kpp ? data.kpp : ''
    resData.full_with_opf = data.name.full_with_opf
    resData.short_with_opf = data.name.short_with_opf
    resData.fullName = data.name.full
    resData.shortName = data.name.short ? data.name.short : 'отсутствует'
    resData.codeOPF = data.opf ? data.opf.code : ''
    resData.opfShort = data.opf ? data.opf.short : ''
    resData.opfFull = data.opf ? data.opf.full : ''
    resData.status = data.state.status
    resData.registration_date = data.state.registration_date
    resData.kladr_id = data.address.data.kladr_id
    resData.cityOrArea = data.address.data.city || data.address.data.area
    if(data.type === 'LEGAL'){
        resData.managementName = data.management ? data.management.name : 'Проверьте не переданы ли полномочия исполнительного органа управляющей компании (управляющему)'
        resData.managementPost = data.management ? data.management.post : 'Проверьте не переданы ли полномочия исполнительного органа управляющей компании (управляющему)'
        resData.isOrg = true
        if (resData.managementPost.toLowerCase().indexOf('предприниматель') !== -1){
            resData.isManager = true
        }else if(resData.managementPost !== 'Проверьте не переданы ли полномочия исполнительного органа управляющей компании (управляющему)') {
            resData.isManager = false
        }else if(resData.managementPost === 'Проверьте не переданы ли полномочия исполнительного органа управляющей компании (управляющему)'){
            resData.isManager = true
        }
        

    }else if(data.type === 'INDIVIDUAL'){
        resData.isOrg = false
    }

    if(resData.managementName !== 'Проверьте не переданы ли полномочия исполнительного органа управляющей компании (управляющему)' && resData.isOrg){
        const arr = resData.managementName.split(' ')
        if (arr.length !== 3) {
            resData.declinedName = ''
        }else{
            resData.declinedName = declineName(arr)
        }
    }

    if(!resData.isOrg){
        const arr = resData.fullName.split(' ')
        if (arr.length !== 3) {
            resData.declinedName = ''
        }else{
            resData.declinedName = declineName(arr)
        }
    }

    if(resData.managementPost !== 'Проверьте не переданы ли полномочия исполнительного органа управляющей компании (управляющему)' && resData.isOrg){
        resData.declinedPost = declinePost()[resData.managementPost.toLowerCase()] || ''
        console.log(resData.managementPost.toLowerCase())
        console.log(declinePost())
        console.log(declinePost()[resData.managementPost.toLowerCase()])
    }



    resData.declinedOPF = declineOPF()[resData.opfFull.toLowerCase()] || ''
    res.send(JSON.stringify(resData))
}

const declineName = (arr) => {
    const person = {
        first: arr[1],
        middle: arr[2],
        last: arr[0]
    }
    let obj = {}
    const cases = [
        'nominative',
        'genitive',
        'dative',
        'accusative',
        'instrumental',
        'prepositional',
    ]
    cases.forEach(function(el){
        obj[el] = petrovich(person, el)
    })
    return obj
}

const declineOPF = () => {
    return {
        'общество с ограниченной ответственностью': {
            genitive: 'общества с ограниченной ответственностью',
            dative: 'обществу с ограниченной ответственностью',
            instrumental: 'обществом с ограниченной ответственностью'
        },
        'закрытое акционерное общество': {
            genitive: 'закрытого акционерного общества',
            dative: 'закрытому акционерному обществу',
            instrumental: 'закрытым акционерным обществом'
        },
        'публичное акционерное общество': {
            genitive: 'публичного акционерного общества',
            dative: 'публичному акционерному обществу',
            instrumental: 'публичным акционерным обществом'
        },
        'акционерное общество': {
            genitive: 'акционерного общества',
            dative: 'акционерному обществу',
            instrumental: 'акционерным обществом'
        },
        'индивидуальный предприниматель': {
            genitive: 'индивидуального предприниателя',
            dative: 'индивидульному предпринимателю',
            instrumental: 'индивидуаьлным предпринимателем'
        }
    }
}

const declinePost = () => {

    return {
        'директор': {
            genitive: 'директора',
            dative: 'директору'
        },
        'генеральный директор': {
            genitive: 'генерального директора',
            dative: 'генеральному директору'
        },
        'руководитель': {
            genitive: 'руководителя',
            dative: 'руководителю'
        },
        'предводитель': {
            genitive: 'предводителя',
            dative: 'предводителю'
        },
        'управляющий - индивидуальный  предприниматель': {
            genitive: 'управляющего - индивидуального предпринимателя',
            dative: 'управляющему - индивидуальному предпринимателю'
        }
    }
}
