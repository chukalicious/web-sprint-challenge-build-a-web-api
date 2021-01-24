// Write your "projects" router here!
const express = require("express");

const router = express.Router();
const Projects = require("./projects-model");

router.get(`/`, async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "no projects here" });
  }
});

module.exports = router;
