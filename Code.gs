// Global variables
var SPREADSHEET_ID = '369675954';
var IMAGE_SHEET_NAME = 'Images';
var CONTACT_SHEET_NAME = 'Contacts';
function getImageUrl(imageName) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(IMAGE_SHEET_NAME);
    
    if (!sheet) {
      Logger.log('Sheet not found: ' + IMAGE_SHEET_NAME);
      return '';
    }
    
    var data = sheet.getDataRange().getValues();
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === imageName) {
        return data[i][1];
      }
    }
    
    Logger.log('Image not found: ' + imageName);
    return ''; // Return empty string if image not found
  } catch (error) {
    Logger.log('Error in getImageUrl: ' + error.toString());
    return '';
  }
}
function doGet() {
  var html = HtmlService.createTemplateFromFile('Index');
  return html.evaluate()
    .setTitle('Banova - Revolutionizing Banana Waste Management')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function submitForm(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Form Responses');
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Interest', 'Message']);
  }
  
  sheet.appendRow([new Date(), data.name, data.email, data.interest, data.message]);
  
  return 'Success';
}
