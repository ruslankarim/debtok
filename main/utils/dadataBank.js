var dadataBank = function(bik, tokenDadata) {


    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank";
    var query = '{"query": "' + bik + '"}';
    var headers = {
        "Authorization": "Token " + tokenDadata
    };
    var fetchArgs = {
        method: "POST",
        contentType: "application/json",
        payload: query,
        headers: headers,
        muteHttpExceptions: false
    }
    try {
        var response = JSON.parse(UrlFetchApp.fetch(url, fetchArgs));

    } catch (e) {
        Logging.execute(SpreadsheetApp.openById(Config.idErrLogsSheet), e)
        return
    }
    Logger.log(response)
    return response.suggestions[0].data;
}