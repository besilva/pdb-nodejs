var express = require('express');
var bodyParser = require('body-parser');
var load = require("express-load");
var expressValidator = require("express-validator");
module.exports = function(){
    app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    load('routes',{cwd: 'app'})
        .then('infra')
        .into(app);
    return app;
}