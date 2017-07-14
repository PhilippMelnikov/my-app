var Category = require('../models/category');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/myAppDb',function(){

    	var categories = [
      	new Category({
      		title: "Кулинария"
      	}),
        new Category({
      		title: "Программирование"
      	}),
        new Category({
      		title: "Психология"
      	}),
        new Category({
          title: "Приключения"
        }),
        new Category({
      		title: "Детективы"
      	}),
      ];

      var done = 0;
      for (i=0; i<categories.length; i++) {
      	categories[i].save(function(err, result){
      		done++;
      		if(done === categories.length)
      		{
      			exit();
      		}
      	});
      }

      function exit(){
        mongoose.disconnect();
      }

});
