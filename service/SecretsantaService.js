"use strict";

let sqlDb;
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var players_array = ["DanieleChiappalupi", "ElenaIannucci", "AndreaGerminario", "TommasoBianchi", "AndreiKolar", "JacopoMargarini", "EmanueleEsposito", "FrancescoCordiano", "EnricoToniato", "DanieleBuccheri"];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

exports.ssantaDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if ssanta table exists");
    return database.schema.hasTable("ssanta").then(exists => {
        if (!exists) {
            console.log("The table SSANTA doesn't exists: creating it.");
            return database.schema.createTable("ssanta", table => {
                table.text("from");
                table.text("to");
            }).then(function() {
                var ssanta_map = new Map();
                var possible_players_from = ["Daniele Chiappalupi", "Elena Iannucci", "Andrea Germinario", "Tommaso Bianchi", "Andrei Kolar", "Jacopo Margarini", "Emanuele Esposito", "Francesco Cordiano", "Enrico Toniato", "Daniele Buccheri"];
                var possible_players_to = ["Daniele Chiappalupi", "Elena Iannucci", "Andrea Germinario", "Tommaso Bianchi", "Andrei Kolar", "Jacopo Margarini", "Emanuele Esposito", "Francesco Cordiano", "Enrico Toniato", "Daniele Buccheri"];
                possible_players_from = shuffle(possible_players_from);
                for(var i = 0; i < 10; i++) {
                    var to_readd = false;
                    if(possible_players_to.includes(possible_players_from[i])) {
                        to_readd = true;
                        possible_players_to.splice( possible_players_to.indexOf(possible_players_from[i]), 1 );
                    }
                    possible_players_to = shuffle(possible_players_to);
                    ssanta_map.set(possible_players_from[i], possible_players_to[0]);
                    possible_players_to.splice(0, 1);
                    if(to_readd) {
                        possible_players_to.push(possible_players_from[i]);
                    }
                }
                var toInsert = new Array();
                for(var fromParam of ssanta_map) {
                    var encryptedFromParam = CryptoJS.AES.encrypt(fromParam[0].replace(/\s/g, ""), "Secret Passphrase").toString();
                    var utf8FromParam = CryptoJS.AES.decrypt(encryptedFromParam).toString();
                    var obj = {
                        from: utf8FromParam,
                        to: CryptoJS.AES.encrypt(fromParam[1], "Secret Passphrase").toString()
                    }
                    toInsert.push(obj);
                }
                return sqlDb('ssanta').insert(toInsert);
            });
        }
    });
};

exports.ssantaUserLogin = function(req, username, password) {
    return sqlDb('user').where('username', username).then(function(response) {
        if (response.length == 0) return false;
        if (response[0].username != username) return false;
        if(!players_array.includes(response[0].firstName.concat(response[0].lastName))) return false;
        var check1 = CryptoJS.AES.decrypt(password, "Secret Passphrase");
        var check2 = CryptoJS.AES.decrypt(response[0].password, "Secret Passphrase");
        if (check1.toString() != check2.toString()) return false;
        var sessionObj = {
            "username": username,
            "id": req.session.id
        }
        return sqlDb('session').where('username', username).then(function(response) {
            if (response.length == 0) {
                return sqlDb('session').insert(sessionObj).then(function(response) {
                    return true
                })
            } else return sqlDb('session').where('username', username).update('id', sessionObj.id).then(function(response) {
                return true
            })
        })
    })
}

exports.checkNameAvailability = function(paramfirstName, paramlastName) {
    return sqlDb('user').where({firstName: paramfirstName, lastName: paramlastName})
}

exports.getSSantaTarget = function(name) {
    var encryptedName = CryptoJS.AES.encrypt(name, "Secret Passphrase").toString();
    var utf8Name = CryptoJS.AES.decrypt(encryptedName).toString();
    return sqlDb('ssanta').where('from', utf8Name).then(function(response) {
        var target = response[0].to;
        var decryptedTarget = CryptoJS.AES.decrypt(target).toString(CryptoJS.enc.Utf8);
        return decryptedTarget;
    })
}