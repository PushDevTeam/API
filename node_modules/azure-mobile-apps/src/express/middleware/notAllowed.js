// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
/**
@module azure-mobile-apps/src/express/middleware/notAllowed
@description Disables access to a particular route and HTTP verb
*/
/**
Create a new instance of the notAllowed middleware
@param {string} method The HTTP method that is disabled
*/
module.exports = function (method) {
    return function (req, res, next) {
        res.status(405).send('Method ' + method + ' is not allowed');
    }
}
