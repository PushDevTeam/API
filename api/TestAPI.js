var app = {
    "get": function (req, res, next) {
        
        //console.log('req', req);
        //console.log('res', res);
        //console.log('next', next);
        //req.end('test TestAPI response');
        var date = { currentTime: Date.now() };
        res.status(200).type('application/json').send(date);
    }
}

module.exports = app;
