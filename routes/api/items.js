const express = require("express");
const Items = require("../../models/Items");
const router = express.Router();

// @route get - gets all items
router.get("/", (req, res) => {
  Items.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

// @route post - posts a new item
router.post("/", (req, res) => {
  const { name } = req.body;
  const newItem = new Items({
    name
  });
  newItem.save().then(item => res.json(item));
});

// @route delete - deletes an item
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Items.findById(id)
    .then(item => item.remove().then(item => res.json({ success: true })))
    .catch(err =>
      res.json({
        sucess: false
      })
    );
});

module.exports = router;
