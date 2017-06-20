"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Anesidora = require('anesidora');
const USERNAME = 'ante@thepushapp.com';
const PASSWORD = 'ant3@thepushapp';
const USERNAME2 = 'pushdailydotfit@gmail.com';
const PASSWORD2 = 'pushdailydotfit';
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
        this.tryAgain = (callback) => {
            this.pandora = new Anesidora(USERNAME2, PASSWORD2);
            return this.login(callback);
        };
    }
}
exports.PandoraBase = PandoraBase;
