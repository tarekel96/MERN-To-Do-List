const express = require("express");
const router = express.Router();
// const Items = require("../../models/Items");
const itemsController = require("../../controllers/items/itemsController");

const {
  findAll,
  findById,
  createItem,
  deleteById,
  updateById
} = itemsController;

// @route '/items' get - gets all items
router.get("/", findAll);

// @route '/items/:id' get - finds an item by id
router.get("/:id", findById);

// @route '/items' post - posts a new item
router.post("/", createItem);

// @route '/items/:id' delete - deletes an item by id
router.delete("/:id", deleteById);

// @route '/items/:id' put - updates an item by id
router.put("/:id", updateById);

module.exports = router;
