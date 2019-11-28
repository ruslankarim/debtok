function doGet() {
    return HtmlService
        .createTemplateFromFile('index')
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}