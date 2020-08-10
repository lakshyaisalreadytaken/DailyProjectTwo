var mongoose = require('mongoose');
//var ObjectId = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var OrderSchema = new Schema({
    user_id    : { type: Object },
    product_id : { type: Object },
    created_at : { type: Date }
});

var Order = mongoose.model('orders', OrderSchema);

module.exports = Order;