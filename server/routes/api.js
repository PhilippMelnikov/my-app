const express = require('express');
const router = express.Router();
var Category = require('../../models/category');
var Item = require('../../models/item');

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

router.post('/categories', (req, res) => {
  var category = new Category(req.body);
  category.save((err, createdObject) => {
    if (err) {
      res.send(err);
    }
    res.send(createdObject);
  });

});

router.delete('/categories/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err) => {
    if (err) throw err;

    console.log('category deleted');
    return res.status(200);
  });
});

// Товары

router.get('/items', (req, res) => {

  Item.find({}, (err, items) => {
    if (err) throw err;

    return res.status(200).json(items);
  });
})


router.get('/items/:category', (req, res) => {

  Item.find({'category': req.params.category}, (err, items) => {
    if (err) throw err;

    return res.status(200).json(items);
  });

});

router.post('/items', (req, res) => {
  var item = new Item(req.body);
  item.save((err, createdObject) => {
    if (err) {
      res.send(err);
    }
    res.send(createdObject);
  });
});

router.delete('/items/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err) => {
    if (err) throw err;

    console.log('item deleted');
    return res.status(200);
  });
});

router.put('/items/:id', (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      res.status(500).send(err);
    } else {
      item.title = req.body.title || item.title;
      item.purchase_price = req.body.purchase_price || item.purchase_price;
      item.selling_price = req.body.selling_price || item.selling_price;
      item.category = req.body.category || item.category;
      item.save((err, item) => {
        if (err) {
          res.status(500).send(err)
        }
        res.status(200).send(item);
      });
    }
  })
});

module.exports = router;
