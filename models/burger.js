var orm = require("../config/orm.js");

var burger = {
  // create: function(burgerName, cb) {
  //     orm.insertOne(burgerName, cb) {

  //     }
  // }

  selectAll: function(cb) {
    orm.selectAll(function(res) {
      cb(res);
    });
  },

  insertOne: function(newBurger, cb) {
    orm.insertOne(newBurger, function(res) {
      cb(res);
    });
  },

  updateOne: function(updateVal, toUpdate, cb) {
    orm.updateOne(updateVal, toUpdate, function(res) {
      cb(res);
    });
  }
};

module.exports = burger;
