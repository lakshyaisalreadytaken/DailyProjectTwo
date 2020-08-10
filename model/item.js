var mongoose = require('mongoose');
//var ObjectId = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    image       : { type: String, default: "" },
    price       : { type: String, default: "" },
    name        : { type: String, default: "" },
    dimensions  : { type: String, default: "" },
    type        : { type: String, default: "" },
    features    : { type: String, default: "" }
});

var Item = mongoose.model('items', ItemSchema);

module.exports = Item;