const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.username;
  const duration = Number(req.body.duration);
  const date = new Date().toLocaleDateString("tr-TR");

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise Added"))
    .catch((err) => res.status(400).json("Error: ", err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted Successfully"))
    .catch((err) => res.json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  Exercise.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  })
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
