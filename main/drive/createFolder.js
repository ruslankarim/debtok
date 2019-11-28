function createFolder(idRootFolder, nameFolder) {
  var rootFolder = DriveApp.getFolderById(idRootFolder)
  var customFolder = rootFolder.createFolder(nameFolder)
  return customFolder.getId()
}

function createFileFromTemplate(idTemplate, idFolder, nameFile){
  const source = DriveApp.getFileById(idTemplate)
  const folder = DriveApp.getFolderById(idFolder)
  const file = source.makeCopy(nameFile, folder)
  return file
}

function replacement(data, file){
  const body = DocumentApp.openById(file.getId()).getBody()

  for(var k in data){
      body.replaceText('{' + k + '}', data[k])
  }
  DocumentApp.openById(file.getId()).saveAndClose()
}


