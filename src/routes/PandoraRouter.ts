import {Router, Request, Response, NextFunction} from 'express';
const Anesidora = require('anesidora');
const USERNAME = 'ante@thepushapp.com';
const PASSWORD = 'ant3@thepushapp';

  class pandoraBase {
    pandora: any = new Anesidora(USERNAME, PASSWORD);
    constructor(){
    }
    login = (callback) => {
      if (this.pandora.authData === null){
        return this.pandora.login(function(err){
          if (err) return callback(err);
          return callback(null);
        });
      } else {
        return callback(null);
      }
    }
  }
class user extends pandoraBase {
    constructor(){super()};
  getStationList = (req: Request, res: Response, next: NextFunction) => {
      const self = this;
      self.login(function(err){
        if (err) throw err;
        self.pandora.request("user.getStationList",{
          'includeStationArtUrl': true
        },function(err, stationList){
          if (err) throw err;
          res.send(stationList);
        })
      })
  }
}

class station extends pandoraBase {
  constructor(){super()};
  getPlaylist = (req: Request, res: Response, next: NextFunction) => {
    const self = this;
    self.login(function(err){
      if (err) throw err;
      self.pandora.request("station.getPlaylist", {
        'stationToken': req.params.id
      }, function(err, playlist){
        if (err) throw err;
        res.send(playlist);
      })
    })
  }
  addFeedback = (req: Request, res: Response, next: NextFunction) => {
    const self = this;
    self.login(function(err){
      if (err) throw err;
      self.pandora.request("station.addFeedback", {
        'stationToken': req.params.stationToken,
        'trackToken': req.params.trackToken,
        'isPositive': Boolean(parseInt(req.params.isPositive))
      }, function(err, resp){
        if (err) throw err;
        res.send(resp);
      })
    })
  }
}
export class PandoraRouter {
  router: Router;
  response: any;
  user = new user();
  station = new station();
  
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    //this.router.get('/', this.login);
    //this.router.get('/login', this.login);
    this.router.get('/user/getStationList', this.user.getStationList);
    this.router.get('/station/getPlaylist/:id', this.station.getPlaylist);
    this.router.post('/station/addFeedback/:stationToken/:trackToken/:isPositive', this.station.addFeedback);

  }

}


// Create the PandoraRouter, and export its configured Express.Router
const pr = new PandoraRouter();
pr.init();

export default pr.router;