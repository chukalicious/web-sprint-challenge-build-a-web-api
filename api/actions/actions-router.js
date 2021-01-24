// Write your "actions" router here!
const express = require("express");

const router = express.Router();

const Actions = require("./actions-model");

router.get(`/`, async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: "error getting the actions" });
  }
});

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const action = await Actions.get(id);
  if (!action) {
    res.status(404).json({ message: "there is no action by that ID" });
  } else {
    try {
      res.status(200).json(action);
    } catch (err) {
      res.status(500).json({ message: "there was a problem with the server" });
    }
  }
});

router.post(`/`, async (req, res) => {
  const newAction = req.body;
  if (!newAction.project_id || !newAction.description || !newAction.notes) {
    res.status(400).json({
      message:
        "You must include a project ID, a description and your notes to add a new action",
    });
  } else {
    try {
      const insertedAction = await Actions.insert(newAction);
      res.status(202).json(insertedAction);
    } catch (err) {
      res.status(500).json({
        message: "There has been an error posting that action",
      });
    }
  }
});

router.put(`/:id`, async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  if (!change.project_id || !change.description || !change.notes) {
    res.status(400).json({
      message:
        "you must include a project ID, a description and notes to edit this action",
    });
  } else {
    try {
      const updatedAction = await Actions.update(id, change);
      if (updatedAction) {
        res.status(201).json(updatedAction);
      } else {
        res.status(404).json({ message: "Could not find action by that ID" });
      }
    } catch (err) {
      res.status(500).json({ message: "Could not update that action" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await Actions.remove(id);
    if (!action) {
      res.status(400).json({ message: "Could not locate action with that ID" });
    } else {
      res.status(204).json({ message: "action deleted" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "there was an error deleting that action" });
  }
});

module.exports = router;
