function setTrigger() {
    var idTrigger,
        handler,
        scriptProps,
        isProp,
        titleForm,
        prop
    
  scriptProps = PropertiesService.getScriptProperties()
  for(var key in Config.forms){
    titleForm = FormApp.openById(Config.forms[key]).getTitle()
    prop = titleForm + ' submit'
    isProp = prop in scriptProps.getProperties()
    if(!isProp){
      idTrigger = ScriptApp.newTrigger('main').forForm(Config.forms[key]).onFormSubmit().create().getUniqueId()
      scriptProps.setProperty(prop, idTrigger)
      Logger.log('Триггер формы: '+ '"' + titleForm + '"' +' успешно создан!')
    } else {
      Logger.log('Триггер формы: '+ '"' + titleForm + '"' +' по видимому уже существует!')
    }
  } 
}
