"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PandoraBase_1 = require("../classes/PandoraBase");
class PandoraUser extends PandoraBase_1.PandoraBase {
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
exports.PandoraUser = PandoraUser;
