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

// @route '/items' GET - gets all items
router.get("/", findAll);

// @route '/items/:id' GET - finds an item by id
router.get("/:id", findById);

// @route '/items' POST - posts a new item
router.post("/", createItem);

// @route '/items/:id' DELETE - deletes an item by id
router.delete("/:_id", deleteById);

// @route '/items/:id' PUT - updates an item by id
router.put("/:id", updateById);

module.exports = router;
