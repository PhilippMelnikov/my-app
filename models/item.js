var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  title: {type: String},
  purchase_price: {type: Number},
  selling_price: {type: Number},
  category: {type: String},
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
