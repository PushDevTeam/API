const Anesidora = require('anesidora');
const USERNAME = 'ante@thepushapp.com';
const PASSWORD = 'ant3@thepushapp';
const USERNAME2 = 'pushdailydotfit@gmail.com';
const PASSWORD2 = 'pushdailydotfit';
export class PandoraBase {
    pandora: any = new Anesidora(USERNAME, PASSWORD);
    constructor(){
    }
    login = (callback) => {
      if (this.pandora.authData === null){
        return this.pandora.login(function(err){
          if (err) return callback(err);
          return callback(null);
        });
      } else {
        return callback(null);
      }
    }
    tryAgain = (callback) => {
      this.pandora = new Anesidora(USERNAME2, PASSWORD2)
      return this.login(callback);
    }
  }