var app = {
    "get": function (req, res, next) {
        
        //console.log('req', req);
        //console.log('res', res);
        //console.log('next', next);
        req.end('test TestAPI response');
    }
}

module.exports = app;
