var Item = require('../models/item');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/myAppDb',function(){


    	var items = [
      	new Item({
          title: "Готовим с удовольствием",
          purchase_price: 59,
          selling_price: 199,
      		category: "596645a0bdc28e190cad1130"
      	}),
        new Item({
          title: "Выразительный Javascript",
          purchase_price: 67,
          selling_price: 255,
      		category: "596645a0bdc28e190cad1131"
      	}),
        new Item({
          title: "Психоанализ",
          purchase_price: 55,
          selling_price: 220,
      		category: "596645a0bdc28e190cad1132"
      	}),
        new Item({
          title: "Остров сокровищ",
          purchase_price: 66,
          selling_price: 180,
          category: "596645a0bdc28e190cad1133"
        }),
        new Item({
          title: "Убийство в восточном экспрессе",
          purchase_price: 35,
          selling_price: 199,
      		category: "596645a0bdc28e190cad1134"
      	}),
        new Item({
          title: "Зачем убивать дворецкого?",
          purchase_price: 35,
          selling_price: 199,
          category: "596645a0bdc28e190cad1134"
        }),
      ];

      var done = 0;
      for (i=0; i<items.length; i++) {
      	items[i].save(function(err, result){
      		done++;
      		if(done === items.length)
      		{
      			exit();
      		}
      	});
      }

      function exit(){
        mongoose.disconnect();
      }

});
