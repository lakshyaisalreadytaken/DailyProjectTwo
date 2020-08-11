let User  = require('./../model/user');
let Item  = require('./../model/item');
let Order = require('./../model/order');

// Basic
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var multer   = require('multer');

const config = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './uploads/images/')
    }, 
    filename: function(req, file, next){
        let ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        next(null, Date.now()  + ext);
    }
});

const upload = multer({ storage: config });

let errorMessage = { error: true, message: "Something went wrong, please try again later.", error: {} };
let noData       = { error: false, message: "No data found", data: [] };

module.exports = function(app, req, res) {
    
    app.post("/register", (req, res) => {
        let name     = (req.body.name)     ? req.body.name     : "",
            email    = (req.body.email)    ? req.body.email    : "",
            password = (req.body.password) ? req.body.password : "",
            mobile   = (req.body.mobile)   ? req.body.mobile   : "",
            address  = (req.body.address)  ? req.body.address  : "";

        let user = new User({
            name     : name,
            email    : email,
            password : password,
            mobile   : mobile,
            address  : address
        })

        user.save(function(error, saved) {
            errorMessage.error = error;
            if(error) return res.send(errorMessage)
            res.send({ error: false, message: "Success", data: saved })
        })
    })

    app.post("/login", function(req, res) {
        let email = (req.body.email) ? req.body.email : "",
            password = (req.body.password) ? req.body.password : "";

        User.findOne({ email: email, password: password }, function(error, userData) {
            if(error) return res.send(errorMessage)
            if(!userData || userData == "" || userData == null) return res.send({ error: true, message: "Email or password is wrong, please check and try again.", data: {} })
            res.send({ error: false, message: "Success", data: userData })
        })
    })

    app.post("/addItem", upload.single('image'), function(req, res) {
        let file_name = (req.file) ? req.file.filename : "",
            name = (req.body.name) ? req.body.name : "",
            price = (req.body.price) ? req.body.price : "",
            dimensions = (req.body.dimensions) ? req.body.dimensions : "",
            type = (req.body.type) ? req.body.type : "",
            features =  (req.body.features) ? req.body.features : "";

        let item = new Item({
            image       : file_name,
            price       : price,
            dimensions  : dimensions,
            name        : name,
            type        : type,
            features    : features
        })

        item.save(function(error, itemSaved) {
            if(error) return res.send(errorMessage)
            res.send({ error: false, message: "Success", data: itemSaved })
        })
    })

    app.post("/listItems", function(req, res) {
        Item.find(function(error, data){
            if(error) return res.send(errorMessage);
            if(data.length == 0) return res.send(noData)
            res.send({ error: false, message: "Success", data: data })
        })
    })

    app.post("/addToBook", function(req, res) {
        let user_id    = (req.body.user_id) ? req.body.user_id : "",
            product_id = (req.body.product_id) ? req.body.product_id : "";

        let order = new Order({
            user_id    : ObjectId(user_id),
            product_id : ObjectId(product_id),
            created_at : new Date()
        })

        order.save(function(error, saved) {
            if(error) return res.send(errorMessage)
            res.send({ error: false, message: "Success", data: saved })
        })
    })

    app.post("/myList", function(req, res) {
        let user_id = (req.body.user_id) ? req.body.user_id : "";

        Order.aggregate(
            [
                { 
                    $match: { 
                        user_id: ObjectId(user_id)
                    }
                },
                {
                    $lookup: {
                        from : "items",
                        localField : "product_id",
                        foreignField : "_id",
                        as : "item_details"
                    }
                }
            ], function(error, orders) {
                if(error) return res.send(errorMessage)
                if(orders.length == 0) return res.send(noData)
                res.send({ error: false, message : "Success", data: orders })
            }
        )
    })
}