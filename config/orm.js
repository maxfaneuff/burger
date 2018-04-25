var connection = require("./connection.js");

// Helper function for SQL syntax.

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(cb) {
    var queryString = "SELECT * FROM burgers;";
    connection.query(queryString, function(err, result) {
      if (err) throw err;

      cb(result);
    });
  },

  insertOne: function(newBurger, cb) {
    var queryString = "INSERT INTO burgers (burger_name, devoured)";
    queryString += "VALUES (";
    queryString += printQuestionMarks(newBurger.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, newBurger, function(err, result) {
      if (err) throw err;

      cb(result);
    });
  },

  updateOne: function(updateVal, toUpdate, cb) {
    var queryString = "UPDATE burgers SET ";
    queryString += objToSql(updateVal);
    queryString += " WHERE ";
    queryString += toUpdate;
    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) throw err;

      cb(result);
    });
  }
};
module.exports = orm;
