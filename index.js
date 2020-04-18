'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var port = 3700


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
	.then(()=>{
		console.log("Conexión a la base de datos establecida satisfactoriamente")

		// Creación del servidor
		app.listen(port, () =>{
			console.log("Servidor corriendo correctamente");
		})

	})	
	.catch(err => console.log(err));
	