import {Router, Request, Response, NextFunction} from 'express';
import {PandoraBase} from '../classes/PandoraBase';
export class PandoraUser extends PandoraBase {
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
