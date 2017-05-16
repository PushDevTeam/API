"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Anesidora = require('anesidora');
const USERNAME = 'ante@thepushapp.com';
const PASSWORD = 'ant3@thepushapp';
class pandoraBase {
    constructor() {
        this.pandora = new Anesidora(USERNAME, PASSWORD);
        this.login = (callback) => {
            if (this.pandora.authData === null) {
                return this.pandora.login(function (err) {
                    if (err)
                        return callback(err);
                    return callback(null);
                });
            }
            else {
                return callback(null);
            }
        };
    }
}
class user extends pandoraBase {
    constructor() {
        super();
        this.getStationList = (req, res, next) => {
            const self = this;
            self.login(function (err) {
                if (err)
                    throw err;
                self.pandora.request("user.getStationList", {
                    'includeStationArtUrl': true
                }, function (err, stationList) {
                    if (err)
                        throw err;
                    res.send(stationList);
                });
            });
        };
    }
    ;
}
class station extends pandoraBase {
    constructor() {
        super();
        this.getPlaylist = (req, res, next) => {
            const self = this;
            self.login(function (err) {
                if (err)
                    throw err;
                self.pandora.request("station.getPlaylist", {
                    'stationToken': req.params.id
                }, function (err, playlist) {
                    if (err)
                        throw err;
                    res.send(playlist);
                });
            });
        };
        this.addFeedback = (req, res, next) => {
            const self = this;
            self.login(function (err) {
                if (err)
                    throw err;
                self.pandora.request("station.addFeedback", {
                    'stationToken': req.params.stationToken,
                    'trackToken': req.params.trackToken,
                    'isPositive': Boolean(parseInt(req.params.isPositive))
                }, function (err, resp) {
                    if (err)
                        throw err;
                    res.send(resp);
                });
            });
        };
    }
    ;
}
class PandoraRouter {
    constructor() {
        this.user = new user();
        this.station = new station();
        this.router = express_1.Router();
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
exports.PandoraRouter = PandoraRouter;
// Create the PandoraRouter, and export its configured Express.Router
const pr = new PandoraRouter();
pr.init();
exports.default = pr.router;
