var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var http       = require('http').Server(app);
const path     = require('path');

var route = require('./route/route');

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

// app.use("/public", express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, "public/privacyPolicy")));
// app.use(express.static(path.join(__dirname, "public/termsAndCondition")));
// app.use(express.static(path.join(__dirname, "public/contactUs")));
app.use("/uploads", express.static(path.join(__dirname, '/uploads')));
// app.use("/payments", express.static(path.join(__dirname, '/payments')));
// app.use("/views", express.static(path.join(__dirname, '/views')));

// app.use("/", express.static(path.join(__dirname, '/')));
// // app.use(express.static(path.join(__dirname, 'admin/boardsAndSignAdminPanel')));
// app.use(express.static(path.join(__dirname, 'public/boardsAndSignWebsite')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/boardsAndSignWebsite/index.html'));
// });

// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'admin/boardsAndSignAdminPanel/index.html'));
// });

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    // res.setHeader('Access-Control-Allow-Origin', 'http://18.218.27.17');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var port = 4001;

route(app);

http.listen(port, function() {
    console.log("Port ", port, " connected successfully.");
})