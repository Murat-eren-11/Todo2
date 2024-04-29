const express = require("express");
const router = express.Router();

const Taches = require("../models/Taches");

router.post("/task/add", async (req, res) => {
  try {
    const newTache = new Taches({
      name: req.body.name,
    });
    await newTache.save();
    res.status(200).json({ message: "Nouvelle tâche" });
  } catch (error) {
    console.log({ message: error.message });
  }
});

router.get("/task", async (req, res) => {
  try {
    const tasks = await Taches.find();
    res.json(tasks);
  } catch (error) {
    console.log({ error: error.message });
  }
});

router.put("/task/modify", async (req, res) => {
  try {
    const taskToModify = await Taches.findById({ name: req.body.name });

    if (!taskToModify) {
      return res.status(404).json({ message: "Tache introuvable" });
    }
    taskToModify.name = name;
    await taskToModify.save();

    res.json({ message: "Tâche mise à jour avec succès", task: taskToModify });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la tâche",
      error: error,
    });
  }
});

router.delete("/task/delete", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Pas de tâche à ce nom" });
    }

    const taskToDelete = await Taches.findOneAndDelete({ name: req.body.name });

    if (!taskToDelete) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }

    res
      .status(200)
      .json({ message: "Tâche supprimée avec succès", task: taskToDelete });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la tâche",
      error: error.message,
    });
  }
});

module.exports = router;
