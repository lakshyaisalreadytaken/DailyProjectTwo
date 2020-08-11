var mongoose = require('mongoose');
//var ObjectId = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/projectTwo', { useNewUrlParser: true });

var UserSchema = new Schema({
    name     : { type: String, default: "" },
    email    : { type: String, default: "" },
    password : { type: String, default: "" },
    address  : { type: String, default: "" },
    mobile   : { type: String, default: "" }
});

var User = mongoose.model('users', UserSchema);

module.exports = User;