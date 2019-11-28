/**
 * Tests the schema.
 */
function testSchemas() {
  var htmlBody = HtmlService.createHtmlOutputFromFile('promoHTML').getContent();

  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Test Email markup - ' + new Date(),
    htmlBody: HtmlService.createHtmlOutputFromFile('promoHTML').getContent(),
  });
}