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
  console.log("post category");
  Category.find({"title": req.body.title}, (err, categories) => {
    if (err) throw err;

    if (categories[0]) {
      res.status(500).send('Категория уже существует!');
    } else {
      var category = new Category(req.body);
      category.save((err, createdObject) => {
        if (err) {
          res.send(err);
        }
          return res.status(200).json(createdObject);
      });
    }
  })

});

router.delete('/categories/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err1) => {
    if (err1) throw err1;

    console.log('category deleted');
    Item.find({'category': req.params.id}, (err2, items) => {
      if (err2) throw err2

      result = [];

      items.forEach((item,i, arr) => {
        item.category = null;
        item.save((err3, createdObject) => {
          if (err3) throw err3

          console.log("createdObject", createdObject);
          result.push(createdObject);
          if(result.length == arr.length){
            return res.status(200).json(result);
          }
        })
      })
    })
  });
});

// Товары

router.get('/items', (req, res) => {

  Item.find({}, (err, items) => {
    if (err) throw err;

    return res.status(200).json(items);
  });
})

router.get('/items/category/noname', (req, res) => {

  Item.find({'category': null}, (err, items) => {
    if (err) throw err;

    return res.status(200).json(items);
  });
})


router.get('/items/:category_id', (req, res) => {
  Item.find({'category': req.params.category_id}, (err, items) => {
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
    res.status(200).send(createdObject);
  });
});

router.delete('/items/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err) => {
    if (err) throw err;

    res.status(200).send({res: "success"});
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
      item.save((err, createdObject) => {
        if (err) {
          res.status(500).send(err)
        }
        res.status(200).send(createdObject);
      });
    }
  })
});

module.exports = router;
