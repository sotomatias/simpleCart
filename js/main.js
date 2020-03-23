//* Add PayPal Email
import {phone} from './config';
simpleCart({
  checkout: {
    type: "MercadoPago",
    email: "you@yours.com"
  }
});

//* Add shopping cart dropdown in header
jQuery(document).ready(function () {
  $('a[href^="whatsapp://"]').each(function(){
    var oldUrl = $(this).attr("href"); // Get current url
    var newUrl = oldUrl.replace("whatsapp://", "whatsapp://"+phone+"?texto=Comparto%20mi%20pedido"); // Create new url
    $(this).attr("href", newUrl); // Set herf value
  });
  $('.showCart').on('click', function () {
    $('#cartPopover').slideToggle('fast');
    $('.showCart span.dropdown').toggleClass('fa-chevron-circle-down fa-chevron-circle-up');
  })
});

//* Define spreadsheet URL (make sure you add the #gid=0 for the sheet you want to use)
var googleSheetURI = 'https://docs.google.com/spreadsheets/d/1XsdeZg7jO33R7pGgOVVYHWFiMdnyqeXL9tLMZpmsuO8/edit#gid=0';

//* Compile the Handlebars template for HR leaders
var HRTemplate = Handlebars.compile($('#hr-template').html());

//* Load products from spreadsheet
$('#products').sheetrock({
  url: googleSheetURI,
  query: "select A,B,C,D,E,F",
  rowTemplate: HRTemplate
});
