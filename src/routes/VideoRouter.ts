import {Router, Request, Response, NextFunction} from 'express';
const Videos = require('../data/videos');

export class VideoRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Videos);
  }

public getOne(req: Request, res: Response, next: NextFunction) {
  let query = parseInt(req.params.id);
  let hero = Videos.find(hero => hero.id === query);
  if (hero) {
    res.status(200)
      .send({
        message: 'Success',
        status: res.status,
        hero
      });
  }
  else {
    res.status(404)
      .send({
        message: 'No video found with the given id.',
        status: res.status
      });
  }
}
  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
  }

}

// Create the VideoRouter, and export its configured Express.Router
const vr = new VideoRouter();
vr.init();

export default vr.router;