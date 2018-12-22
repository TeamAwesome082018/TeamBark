var db = require("../models");

module.exports = function (app) {
  // Get all our database data for all tables
  app.get("/api/user", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/dog", function (req, res) {
    db.Dog.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/posts", function (req, res) {
    db.Posts.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/dog", function (req, res) {
    db.Dog.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/signin", function (req, res) {
    res.render("signin");
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
