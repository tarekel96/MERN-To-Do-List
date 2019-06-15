const Items = require("../../models/Items.js");

module.exports = {
  findAll: (req, res) => {
    Items.find()
      .sort({ date: -1 })
      .then(items => res.json(items))
      .catch(err => console.log(err));
  },
  findById: (req, res) => {
    const { id } = req.params;
    Items.findById(id)
      .then(item => {
        res.json(item);
      })
      .catch(err => {
        res.json({
          sucess: false
        });
      });
  },
  createItem: (req, res) => {
    const { name } = req.body;
    const newItem = new Items({
      name
    });
    newItem.save().then(item => res.json(item));
  },
  deleteById: (req, res) => {
    const { id } = req.params;
    Items.findById(id)
      .then(item => item.remove().then(item => res.json({ success: true })))
      .catch(err =>
        res.json({
          sucess: false
        })
      );
  },
  updateById: (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    Items.findByIdAndUpdate(id)
      .then(item => {
        item.name = name;
        item.date = Date.now();
        item.save().then(newItem => res.json(newItem));
      })
      .catch(err => {
        throw err;
      });
  }
};
