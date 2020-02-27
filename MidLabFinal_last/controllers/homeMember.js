var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('homeMember/index', {user: result});
	});
});


router.get('/view_car', function(req, res){
	
		userModel.getAllcar(function(results){
			if(results.length > 0){
				res.render('homeMember/view_car', {carlist: results});
			}else{
				res.redirect('/homeMember');
			}

			});

		});

router.get('/editcar/:id', function(req, res){
	userModel.getByIdcar(req.params.id, function(result){
		res.render('homeMember/editcar', {car: result});
	});
});

router.post('/editcar/:id', function(req, res){
	
		var car = {
			id: req.params.id,
			carname: req.body.carname,
			price: req.body.price,
			type: req.body.type
		};

		userModel.updatecar(car, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/homeMember/editcar/'+req.params.id);
			}
		});
});

router.get('/deletecar/:id', function(req, res){
	
		var car = {
			id: req.params.id,
			carname: req.body.carname,
			price: req.body.price,
			type: req.body.type
		};

		userModel.deletecar(car, function(status){
			if(status){
				res.redirect('/homeMember/view_car');
			}else{
				res.redirect('/homeMember/view_car');
			}
		});
});

router.get('/deletecar/:id', function(req, res){
	
		var car = {
			id: req.params.id,
			carname: req.body.carname,
			price: req.body.price,
			type: req.body.type
		};

		userModel.deletecar(car, function(status){
			if(status){
				res.redirect('/homeMember/view_car');
			}else{
				res.redirect('/homeMember/view_car');
			}
		});
});




router.get('/newCar', function(req, res){
	
		res.render('homeMember/newCar');
	
});

router.post('/newCar', function(req, res){
	
		var car = {
			id: req.body.id,
			carname: req.body.carname,
			price: req.body.price,
			type: req.body.type
		};

		userModel.insertCar(car, function(status){
			if(status){
				res.redirect('/homeMember/view_car');
			}else{
				res.redirect('/homeMember/view_car');
			}
		});
});

module.exports = router;