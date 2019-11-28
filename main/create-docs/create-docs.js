 function createDocs(e){
    var res = Responses.get(e)
    var kindDoc = res['Выберете документ']

    mastersDocs[kindDoc](res)
 }