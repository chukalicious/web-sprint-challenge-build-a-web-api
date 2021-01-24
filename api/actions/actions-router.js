// Write your "actions" router here!
const express = require("express");

const router = express.Router();

const Actions = require("./actions-model");

router.get(`/:id`, (req, res) => {
  const { id } = req.params;
  const action = Actions.get(id)
    .then((action) => res.status(200).json(action))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "there was a problem getting the action" })
    );
});

module.exports = router;
