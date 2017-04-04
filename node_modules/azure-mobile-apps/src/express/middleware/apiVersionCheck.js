// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
/**
@module azure-mobile-apps/src/express/middleware/apiVersionCheck
@description Ensures that the API version that the client understands is compatible
with the API version that the server understands.
*/

var errors = require('../../utilities/errors'),
    acceptedVersionRegex = /^2[.]0[.]\d+$/,
    acceptedVersion = '2.0.0';

/**
Create a new instance of the apiVersionCheck middleware
@param {configuration} configuration The mobile app configuration
*/
module.exports = function (configuration) {
    return function (req, res, next) {
        if(!configuration.skipVersionCheck && req.method.toUpperCase() !== 'OPTIONS') {
            var apiVersion = versionValue(); // req.get('zumo-api-version') || req.query['zumo-api-version'];
            if(!apiVersion || !apiVersion.match(acceptedVersionRegex))
                next(errors.badRequest('An invalid API version was specified in the request, this request needs to specify a ZUMO-API-VERSION of ' + acceptedVersion + '.'));
        }
        next();

        function versionValue() {
            var header = req.get('zumo-api-version');
            if(header) return header;

            var queries = Object.keys(req.query);
            for(var i = 0, l = queries.length; i < l; i++) {
                if(queries[i].toLowerCase() === 'zumo-api-version')
                    return req.query[queries[i]];
            }
        }
    };
};
