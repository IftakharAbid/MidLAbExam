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
		res.render('home/index', {user: result});
	});
});

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}

			});

		});

router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

router.get('/delete/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.delete(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/view_users');
			}
		});
});



router.get('/view_car', function(req, res){
	
		userModel.getAllcar(function(results){
			if(results.length > 0){
				res.render('home/view_car', {carlist: results});
			}else{
				res.redirect('/home');
			}

			});

		});

router.get('/editcar/:id', function(req, res){
	userModel.getByIdcar(req.params.id, function(result){
		res.render('home/editcar', {car: result});
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
				res.redirect('/home/editcar/'+req.params.id);
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
				res.redirect('/home/view_car');
			}else{
				res.redirect('/home/view_car');
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
				res.redirect('/home/view_car');
			}else{
				res.redirect('/home/view_car');
			}
		});
});




router.get('/newCar', function(req, res){
	
		res.render('home/newCar');
	
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
				res.redirect('/home/view_car');
			}else{
				res.redirect('/home/view_car');
			}
		});
});

module.exports = router;