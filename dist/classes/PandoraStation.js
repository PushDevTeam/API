"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PandoraBase_1 = require("./PandoraBase");
class PandoraStation extends PandoraBase_1.PandoraBase {
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
exports.PandoraStation = PandoraStation;
