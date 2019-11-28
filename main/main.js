function main(e) {
  try {
    if(!masters[e.triggerUid]){
      throw new Error('masters[' + e.triggerUid + '] не определен')
    }
      masters[e.triggerUid](e)
    } catch(err){
     var sheet = SpreadsheetApp.openById(Config.idErrLogsSheet)
     Logging.execute(sheet, err)
    }   
}