var auth = require('azure-mobile-apps/src/auth'),
    simplecrypt = require('simplecrypt');


var app = {
    // validates a username and password and returns a JWT token if successful
    post: function (req, res, next) {
        var context = req.azureMobile,
            // the sign function creates a signed JWT token from provided claims
            sign = auth(context.configuration.auth).sign;
        
        context.tables('UserAuth')
            .where({ username: req.body.username })
            .read()
            .then(function (users) {
                if(users.length === 0){
                    res.status(402).type('application/json').send("User not found");
                }
                else if(users.length === 1 && validatePassword(req.body.password, users[0].password)) {
                    res.json(createResponse(sign, users[0]))
                }
                else
                {
                    res.status(401).send("Incorrect username or password");
                }
            })
            .catch(next);
    },

    // create a new user with the specified username and password and return a JWT token
    put: function (req, res, next) {
        var context = req.azureMobile,
            sign = auth(context.configuration.auth).sign;

        context.tables('UserAuth')
            .insert({
                username: req.body.username,
                password: hashPassword(req.body.password)
            })
            .then(function (user) {
                res.json(createResponse(sign, user));
            })
            .catch(next);
    }
};

//DO NOT CHANGE, or all db passwords will become invalid
var pw = "a9b9d8e3-6fc9-442d-843d-8c323a756a0d";
var s = "c652a5ad-ad85-4951-b322-e05197cda6c1";

function createResponse(sign, user) {
    return {
        // this JWT token must be applied on the Mobile Apps client using the appropriate client APIs
        token: sign({
            // sub is the only required property. this becomes context.user.id
            // you can add other claims here. they become available as context.user.claims
            sub: user.username
        })
    };
}

function hashPassword(password) {
    return simplecrypt({password: pw, salt: s}).encrypt(password);
    //return simplecrypt.hashSync(password, 10);
}

function validatePassword(password, hashed) {
    return password == simplecrypt({password: pw, salt: s}).decrypt(hashed);
    //return simplecrypt().decrypt(hashed) == password;
    
    //return simplecrypt.compareSync(password, hashed)
}


module.exports = app;