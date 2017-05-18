"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Anesidora = require('anesidora');
const USERNAME = 'ante@thepushapp.com';
const PASSWORD = 'ant3@thepushapp';
class PandoraBase {
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
exports.PandoraBase = PandoraBase;
