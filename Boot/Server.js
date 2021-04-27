'use strict';

///////////////////////////////////////////////////////////////////////////////////////////////////
// [ Welcome To [ CRUD  ] ] 
// Programming Language : Node.js
// Database : MongoDB
// Node js and Express js Lib. part
//////////////////////////////////////////////////////////////////////////////////////////////////

// [ Used for create a server side application ]
var express = require('express');

// [ Packeages ]
var fs = require('fs');
var join = require('path').join;
var path = require('path');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
const session=require('express-session');
var FileStore=require('session-file-store')(session);
var bodyparser = require('body-parser');
var fileUpload=require('express-fileupload');
var flash=require('connect-flash');
var passport = require('passport');


var Sys= new require('../Boot/Sys');

var fileStoreOptions={};

// Sys.App as use for global variable for use any ever
Sys.App=express();

// [ File Upload ]
Sys.App.use(fileUpload());

// [ For Parsing Application/JSON ]
Sys.App.use(bodyparser.json());

// [ For Pasrsing Application/XWWW ]
Sys.App.use(bodyparser.urlencoded({
    extended: true
 }));


// [ Flash For Error & Message ]
Sys.App.use(flash());

// [ Session ]
Sys.App.use(session({
    store:new FileStore(fileStoreOptions),
    secret: 'work hard',
    resave: true,
    saveUninitialized: true
}));


// [ Passport : is Authentication middleware ] 
Sys.App.use(passport.initialize());
Sys.App.use(passport.session());


// [ Middleware To Use Session Data in All Routes ]
Sys.App.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

// [ Set Views ]
// This fucnction use for get html pages 
nunjucks.configure('./App/Views', {
    autoescape: true,
    express: Sys.App,
    watch: false,
});

// That function use for set html view
Sys.App.set('view engine', 'html');

//  Expose the public folder as static resources to access Images/CSS/JS 
Sys.App.use(express.static('./public'));

// Expose the node_modules folder as static resources to access Node packages
Sys.App.use('/node_modules',express.static('./node_modules'));

// Server create
Sys.Server=require('http').Server(Sys.App);

// Config file this handels Database 
Sys.Config=new Array();
fs.readdirSync(join(__dirname, '../Config'))
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(function(file) {
        Sys.Config[file.split('.')[0]] = require(join(join(__dirname, '../Config'), file))
    });

console.log("Initialzing Server...");

// This Thing use for in App Folder Find Folder and file
fs.readdirSync(path.join(__dirname,'../','./App')).filter(function(file){
    return (file.indexOf(".")!==0) && (file.indexOf(".")===-1);
}).forEach(function(dir){
    if(dir!='Views' && dir !='Routes'){ //Ignore Load Views & Routes in Sys Object 
        Sys.App[dir]={}
        console.log("Loading App Folder " +dir);
        fs.readdirSync(path.join(__dirname,'../','./App',dir)).filter(function(file){
            return (file.indexOf(".")!==0)
        }).forEach(function(file){
            Sys.App[dir][file.split('.')[0]]=require(path.join(__dirname,'../','./App',dir,file));
        })
    }
});

console.log("Loading Router Folder ");
fs.readdirSync(join(__dirname,'../App/Routes')).filter(file=>~file.search(/^[^\.].*\.js$/))
.forEach(function(file){
Sys.App.use('/',require(join(join(__dirname,'../App/Routes'),file))); // Register Router to App.use 
});

// Mongodb Connection

console.log('Loading... DB Connection');

var dbURI = 'mongodb://' + Sys.Config.Database[Sys.Config.Database.connectionType].mongo.host + ':' + Sys.Config.Database[Sys.Config.Database.connectionType].mongo.port + '/' + Sys.Config.Database[Sys.Config.Database.connectionType].mongo.database;
// CONNECTION EVENTS    
mongoose.connect(dbURI, Sys.Config.Database.option);

// When successfully connected
mongoose.connection.on('connected', async function() {

    const { exec } = require("child_process");
    exec("node -v",function(req,res){
        console.log("Node Version : ",res)
    })

    exec("mongod -version",function(req,res){
        console.log("MongoDB Version : ",res)
    })

    Sys.Server.listen(8080,function(){
        
        Sys.App.use(function(req,res,next){
            res.render('404.html');
        });

        console.log("***************************************************************************");
        console.log("                               Server started                              ");
        console.log('                           http://'+ Sys.Config.Database[Sys.Config.Database.connectionType].mongo.host + ':8080');
        console.log("***************************************************************************");

    })
});

// If the connection throws an error
mongoose.connection.on('error', async function(err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports={app:Sys.App,server:Sys.Server};