// Write your "actions" router here!
const express = require("express");

const router = express.Router();

const Actions = require("./actions-model");

router.get(`/`, async (req, res) => {
  //   const { id } = req.params;
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

module.exports = router;
