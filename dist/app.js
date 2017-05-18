"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const HeroRouter_1 = require("./routes/HeroRouter");
const VideoRouter_1 = require("./routes/VideoRouter");
const AuthRouter_1 = require("./routes/AuthRouter");
const PandoraRouter_1 = require("./routes/PandoraRouter");
//declare const Azure: any;// * as Azure from 'azure-mobile-apps';;
const azureMobileApps = require('azure-mobile-apps');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.azure = azureMobileApps({});
        this.middleware();
        this.routes();
        this.azureConfig();
        this.azure.tables.initialize().then(() => {
            this.express.use(this.azure);
            //this.express.listen(process.env.PORT || 3000);
        });
    }
    // Configure azure mobile apps api
    azureConfig() {
        this.azure.tables.import('./tables');
        this.azure.api.import('./api');
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/heroes', HeroRouter_1.default);
        this.express.use('/api/v1/videos', VideoRouter_1.default);
        this.express.use('/api/v1/auth', AuthRouter_1.default);
        this.express.use('/api/v1/pandora', PandoraRouter_1.default);
    }
}
exports.default = new App().express;
