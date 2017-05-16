import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import HeroRouter from './routes/HeroRouter';
import VideoRouter from './routes/VideoRouter';
import AuthRouter from './routes/AuthRouter';
import PandoraRouter from './routes/PandoraRouter';

//declare const Azure: any;// * as Azure from 'azure-mobile-apps';;
const azureMobileApps = require('azure-mobile-apps');
// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public azure: any;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.azure = azureMobileApps({});
    this.middleware();
    this.routes();
    
    this.azureConfig();
    this.azure.tables.initialize().then(()=>{
        this.express.use(this.azure);
        //this.express.listen(process.env.PORT || 3000);
    });
  }

  // Configure azure mobile apps api
  azureConfig(){
      this.azure.tables.import('./../tables');
      this.azure.api.import('./../api');
  }
  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1/heroes', HeroRouter);

    this.express.use('/api/v1/videos', VideoRouter);
    this.express.use('/api/v1/auth', AuthRouter);
    this.express.use('/api/v1/pandora', PandoraRouter);
  }

}

export default new App().express;