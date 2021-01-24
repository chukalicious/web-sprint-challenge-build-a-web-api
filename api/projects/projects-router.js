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

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const project = await Projects.get(id);
  if (!project) {
    res.status(400).json({ message: "Could not find a project with that ID" });
  } else {
    try {
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  }
});

router.post(`/`, async (req, res) => {
  const { id } = req.params;
  const projectBody = req.body;
  if (!projectBody.name || !projectBody.description) {
    res
      .status(400)
      .json({ message: "must include a project name and description" });
  } else {
    try {
      const newProject = await Projects.insert(projectBody, id);
      res.status(202).json(newProject);
    } catch (err) {
      res.status(500).json({ message: "could not add new project" });
    }
  }
});

module.exports = router;
