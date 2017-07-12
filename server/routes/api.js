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


module.exports = router;
