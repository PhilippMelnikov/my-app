const express = require('express');
const router = express.Router();
var Category = require('../../models/category');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all categories
router.get('/categories', (req, res) => {

  Category.find({}, (err, categories) => {
    if (err) throw err;

    return res.status(200).json(categories);
  });

});

router.delete('/categories/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err) => {
    if (err) throw err;

    console.log('category deleted');
    return res.status(200);
  });
});

router.get('/items/:category', (req, res) => {

  Item.find({category: req.params.category}, (err, items) => {
    if (err) throw err;

    return res.status(200).json(items);
  });

});

module.exports = router;
