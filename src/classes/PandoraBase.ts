const Anesidora = require('anesidora');
//const USERNAME = 'ante@thepushapp.com';
//const PASSWORD = 'ant3@thepushapp';
const USERNAME = 'pushdailydotfit@gmail.com';
const PASSWORD = 'pushdailydotfit';
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
  }