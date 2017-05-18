import {Router, Request, Response, NextFunction} from 'express';
import {PandoraBase} from '../classes/PandoraBase';
import {PandoraStation} from '../classes/PandoraStation';
import {PandoraUser} from '../classes/PandoraUser';


export class PandoraRouter {
  router: Router;
  response: any;
  user = new PandoraUser();
  station = new PandoraStation();
  
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    //this.router.get('/', this.login);
    //this.router.get('/login', this.login);
    this.router.get('/user/getStationList', this.user.getStationList);
    this.router.get('/station/getPlaylist/:id', this.station.getPlaylist);
    this.router.get('/station/getStation/:stationToken', this.station.getStation);
    this.router.post('/station/addFeedback/:stationToken/:trackToken/:songIdentity/:isPositive', this.station.addFeedback);

  }

}

const pr = new PandoraRouter();
pr.init();

export default pr.router;