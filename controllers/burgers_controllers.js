var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

var app = express();

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hasObject = {
      burgers: data
    };
    console.log(hasObject);
    res.render("index", hasObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne([req.body.name, req.body.devoured], function(data) {
    res.json({ id: data.id });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var chosen = "id = " + req.params.id;

  burger.updateOne(
    {
      devoured: req.body.devour
    },
    chosen,
    function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

module.exports = router;
