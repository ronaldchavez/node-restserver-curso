const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const _ = require('underscore');

app.get('/usuario', function (req, res) {

	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

  	Usuario.find({ estado: true }, 'nombre email role estado google img')
  		 .skip(desde)
  		 .limit(limite)
  		 .exec( ( err, data ) => {

  		 	if(err){
				return res.status(400).json({
					ok: false,
					err
				});	
			}

			Usuario.count({ estado: true }, (err, count) => {

				res.json({
				  	usuario: data,
				  	ok: true,
				  	count
		  		});

			});

			

  		 });
});


app.post('/usuario', function (req, res) {

	let body = req.body;

	let usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: body.password,
		role: body.role
	});

	usuario.save( (err,usuarioBd) => {

		if(err){
			return res.status(400).json({
				ok: false,
				err
			});	
		}

		res.json({
		  	usuario: usuarioBd,
		  	ok: true
		  });
	});

});

app.put('/usuario/:id', function (req, res) {

	let id = req.params.id;

	let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'] );

	Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioBd) => {

		if(err){
			return res.status(400).json({
				ok: false,
				err
			});	
		}

		res.json({
  			ok: true,
  			usuario: usuarioBd 
  		});
	})

  	
});

app.delete('/usuario/:id', function (req, res) {

  let id = req.params.id;

  let body = {
  	estado: false
  }

	Usuario.findByIdAndUpdate( id, body, (err, usuarioBorrado) => {

		if(err){
			return res.status(400).json({
				ok: false,
				err
			});	
		}

		if(!usuarioBorrado){

			return res.status(400).json({
				ok: false,
				err: {
					message: 'usuario no encontrado'
				}
			});

		}

		res.json({
  			ok: true,
  			usuario: usuarioBorrado 
  		});
	})

  /*

  Usuario.findByIdAndRemove(id, (err,usuarioBorrado) => {

  		if(err){
			return res.status(400).json({
				ok: false,
				err
			});	
		}

		if(!usuarioBorrado){

			return res.status(400).json({
				ok: false,
				err: {
					message: 'usuario no encontrado'
				}
			});

		}

		res.json({
  			ok: true,
  			usuario: usuarioBorrado 
  		});

  });

  */

});


module.exports = app;