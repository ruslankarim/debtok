import collector from '../collector'
export default function (query, suggestion, token) {
    const baseUrl = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${suggestion}`
    const req = query.replace(/['"«»]/g, '')
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: '{"query": "' + req + '"}'

    }

    async function getDadata(){
        const res = await fetch(`${baseUrl}`, parameters)

        return await res.json()
    }

     function getLabels(arr, suggestion){
        collector(arr)
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

                sourceValue = response.data.name.full_with_opf
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
     let result = getDadata().then(response => {

        return response.suggestions

    }).then((res) => {
        return getLabels(res, suggestion)
    })
    return result
}