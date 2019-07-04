'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

let sqlDb;

let { setupDataLayer } = require("./service/DataLayer");

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 8080;
var serveStatic = require ('serve-static');
let cookieParser = require("cookie-parser");
let cookieSession = require("cookie-session");
let uuidv1 = require('uuid/v1');

app.use(cookieParser());
app.use(cookieSession({
    name: "session",
    keys: ["abc", "def"],
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(function(req, res, next) {
	console.log("")
	console.log("Are you logged in?")
	console.log(req.session.loggedin)
    console.log("Is this a new session?")
    console.log(req.session.isNew)
    console.log("ID?")
	console.log(req.session.id)

    if (req.session.id === undefined || !req.session.loggedin) {
        req.session.id = uuidv1();
        console.log(req.session.id)
    }

    req.session.save()
    next()
})

app.use(serveStatic("./pages"))

// swaggerRouter configuration
var options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://hyp-2019-chiappalupi-iannucci.herokuapp.com");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // Start the server
    setupDataLayer().then(() => {
        http.createServer(app).listen(serverPort, function() {
            console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
            console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
        });
    });

});