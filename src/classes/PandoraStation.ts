import {Router, Request, Response, NextFunction} from 'express';
import {PandoraBase} from './PandoraBase';
export class PandoraStation extends PandoraBase {
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
      //first check if song already has feedback on this station
      
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
  getStation = (req: Request, res: Response, next: NextFunction) => {
      const self = this;
      self.login(function(err){
          if (err) throw err;
          self.pandora.request("station.getStation", {
            "stationToken": req.params.stationToken,
            "includeExtendedAttributes": true
          }, function(err, resp){
              if (err) throw err;
              res.send(resp);
          })
      })
  }
  isSongAlreadyLiked = (stationToken, trackToken) =>{
    const self = this;
    self.login(function(err){
        if (err) throw err;
        self.pandora.request("station.getStation", {
            "stationToken": stationToken,
            "includeExtendedAttributes": true
        }, function (err, resp){
            if (err) throw err;
            
        })
    })
  }
}