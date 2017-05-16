"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Videos = require('../data/videos');
class VideoRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAll(req, res, next) {
        res.send(Videos);
    }
    getOne(req, res, next) {
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
exports.VideoRouter = VideoRouter;
// Create the VideoRouter, and export its configured Express.Router
const vr = new VideoRouter();
vr.init();
exports.default = vr.router;
