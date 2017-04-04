// ----------------------------------------------------------------------------
// Copyright (c) 2015 Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------

// This is a base-level Azure Mobile App SDK.
var express = require('express'),
    azureMobileApps = require('azure-mobile-apps'),
    auth = require('azure-mobile-apps/src/auth'),
    oauth2svr = require('oauth2-server'),
    expressoauth = require('express-oauth-server'),
    bodyParser = require('body-parser'),
    simplecrypt = require('simplecrypt');
//    bcrypt = require('bcrypt');
// Set up a standard Express app
var app = express();

app.oauth = new OAuthServer({
    model:{// We support generators.
  getAccessToken: function *() {
    yield somethingAsync();

    return 'works!'
  },

  // Or, async/await (using _babel_).
  getAuthorizationCode: async function() {
    await somethingAsync();

    return 'works';
  },

  // Or, calling a node-style callback.
  getClient: function(done) {
    if (true) {
      return done(new Error());
    }

    done(null, 'works!');
  },

  // Or, returning a promise.
  getUser: function() {
    return new Promise('works!');
  }}});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(app.oauth.authorize());

app.use(function(req, res){res.send('Secret Area');});
// If you are producing a combined Web + Mobile app, then you should handle
// anything like logging, registering middleware, etc. here

// Configuration of the Azure Mobile Apps can be done via an object, the
// environment or an auxiliary file.  For more information, see
// http://azure.github.io/azure-mobile-apps-node/global.html#configuration
var mobile = azureMobileApps({});


// Import the files from the tables directory to configure the /tables endpoint
mobile.tables.import('./tables');

// Import the files from the api directory to configure the /api endpoint
mobile.api.import('./api');

// Initialize the database before listening for incoming requests
// The tables.initialize() method does the initialization asynchronously
// and returns a Promise.
mobile.tables.initialize()
    .then(function () {
        app.use(mobile);    // Register the Azure Mobile Apps middleware
        app.listen(process.env.PORT || 3000);   // Listen for requests
    });
