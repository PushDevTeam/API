"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PandoraBase_1 = require("./PandoraBase");
class PandoraStation extends PandoraBase_1.PandoraBase {
    constructor() {
        super();
        this.altCreds = false;
        this.getPlaylist = (req, res, next) => {
            const self = this;
            let loginFn;
            if (!this.altCreds) {
                loginFn = self.login;
            }
            else {
                loginFn = self.tryAgain;
            }
            loginFn(function (err) {
                if (err)
                    throw err;
                self.pandora.request("station.getPlaylist", {
                    'stationToken': req.params.id
                }, function (err, playlist) {
                    if (err && !this.altCreds) {
                        this.altCreds = true;
                        return this.getPlaylist(req, res, next);
                    }
                    res.send(playlist);
                });
            });
        };
        this.addFeedback = (req, res, next) => {
            const self = this;
            self.login(function (err) {
                if (err)
                    throw err;
                if (Boolean(parseInt(req.params.isPositive))) {
                    //first check if song already has feedback on this station
                    self.isSongAlreadyLiked(req.params.stationToken, req.params.songIdentity, function (err) {
                        if (err)
                            throw err;
                        if (!(self.feedbackReturn == false)) {
                            //user is un-thumbupping
                            self.pandora.request("station.deleteFeedback", {
                                'feedbackId': self.feedbackReturn.feedbackId
                            }, function (err, resp) {
                                if (err)
                                    throw err;
                                res.send(resp);
                            });
                        }
                        else {
                            self.pandora.request("station.addFeedback", {
                                'stationToken': req.params.stationToken,
                                'trackToken': req.params.trackToken,
                                'isPositive': Boolean(parseInt(req.params.isPositive))
                            }, function (err, resp) {
                                if (err)
                                    throw err;
                                res.send(resp);
                            });
                        }
                    });
                }
            });
        };
        this.getStation = (req, res, next) => {
            const self = this;
            self.login(function (err) {
                if (err)
                    throw err;
                self.pandora.request("station.getStation", {
                    "stationToken": req.params.stationToken,
                    "includeExtendedAttributes": true
                }, function (err, resp) {
                    if (err)
                        throw err;
                    res.send(resp);
                });
            });
        };
        this.isSongAlreadyLiked = (stationToken, songIdentity, next) => {
            const self = this;
            let returnable = false;
            return self.login(function (err) {
                if (err)
                    throw err;
                self.pandora.request("station.getStation", {
                    "stationToken": stationToken,
                    "includeExtendedAttributes": true
                }, function (err, resp) {
                    if (err)
                        throw err;
                    console.log('isSongAlreadyLiked response', resp);
                    let items = resp.feedback.thumbsUp;
                    for (let i = 0; i < items.length; i++) {
                        let item = items[i];
                        if (item.songIdentity == songIdentity) {
                            //returnable = item;
                            self.feedbackReturn = item;
                            return next(err);
                            //return item;
                        }
                    }
                    self.feedbackReturn = returnable;
                    return next(err);
                    //return returnable;
                });
            });
        };
    }
    ;
}
exports.PandoraStation = PandoraStation;
