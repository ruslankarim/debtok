

export default function (query, suggestion, token, clb ) {
    let req,
        xhr,
        arr
    req = query.replace(/['"«»]/g, '')
    xhr = new XMLHttpRequest()
    xhr.open('POST', `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${suggestion}`, false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.send('{"query": "' + req + '"}')
    arr = JSON.parse(xhr.responseText).suggestions

    return arr
}


export function getLabels(arr, suggestion){
    if (arr.length === 0) return  []
    let labels = []

    if ('inn' in arr[0].data && suggestion === 'party') {

        labels = arr.map(function (response) {

            let sourceValue,
                inn,
                ogrn,
                address,
                value,
                post,
                name

            sourceValue = response.value || response.unrestricted_value
            inn = response.data.inn || 'не опредлелено'
            ogrn = response.data.ogrn || 'не опредлелено'
            address = response.data.address ? `Адрес: ${response.data.address.value}` || `${response.data.address.unrestricted_value}` : 'не опредлелено'
            if (!!response.data.management) {
                post = response.data.management.post || 'Руководитель'
                name = response.data.management.name + ', '
            } else {
                post = ''
                name = ''
            }
            value = `${sourceValue}, ИНН ${inn}, ОГРН ${ogrn}, ${post} ${name}${address}`

            return {label: value}
        })
        return labels
    }
    if ('postal_code' in arr[0].data && suggestion === 'address'){
         labels = arr.map(function (response) {

             let sourceValue,
                 value

             sourceValue = response.value || response.unrestricted_value
             value = `${sourceValue}`

             return {label: value}
         })
         return labels
     }
}








