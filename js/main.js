//* Add PayPal Email
import {phone} from './config.js';
simpleCart({
  checkout: {
    type: "MercadoPago",
    email: "you@yours.com"
  }
});

//* Add shopping cart dropdown in header
jQuery(document).ready(function () {
  var text = JSON.parse(localStorage.getItem('simpleCart_items'));
  var products = [];
  for (var key in text) {
    // skip loop if the property is from prototype
    if (!text.hasOwnProperty(key)) continue;
    var obj = text[key];
    products.push({
      "name" : obj['name'],
      "description" : obj['description'],
      "quantity" : obj['quantity'],
      "price" : obj['price'],
    });
  }
  var total = products.reduce((sum, value) => (typeof value.price == "number" ? sum + (value.price * value.quantity) : sum), 0);
  var order = [];
  products.forEach(product => {
      order.push("Producto: "+product.name+"%0ADescripción: "+product.description+"%0ACantidad: "+product.quantity+"%0APrecio: $"+product.price+"%0A%0A");
  });
  var order = JSON.stringify(order);
  var order = order.replace(/[\])}[{(]/g, '');
  var order = order.replace(/^"(.*)"$/, '$1');
  var order = order.replace(/,\s?/g, "");
  var order = order.replace(/".*?"/g, '');
  var order = order.replace(/ /g,"%20");
  $('a[href^="whatsapp://"]').each(function(){
    var oldUrl = $(this).attr("href"); // Get current url
    var newUrl = oldUrl.replace("whatsapp://", "https://wa.me/"+phone+"?text=Pedido%0A%0A"+order+"Total:%20$"+total); // Create new url
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
