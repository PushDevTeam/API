"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PandoraStation_1 = require("../classes/PandoraStation");
const PandoraUser_1 = require("../classes/PandoraUser");
class PandoraRouter {
    constructor() {
        this.user = new PandoraUser_1.PandoraUser();
        this.station = new PandoraStation_1.PandoraStation();
        this.router = express_1.Router();
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
exports.PandoraRouter = PandoraRouter;
const pr = new PandoraRouter();
pr.init();
exports.default = pr.router;
