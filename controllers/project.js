'use strict'

var Project = require('../models/project')
var fs = require('fs')
var path = require('path');

var controller = {

	home: function(req, res){
		return res.status(200).send({
			message: "Soy la home"
		})
	},

	test: function(req, res){
		return res.status(200).send({
			message: "Soy el test del controlador de project"
		})
	},

	saveProject: function(req, res){
		var project = new Project();

		var params = req.body;

		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;
		project.nameClient = params.nameClient;
		project.dateStart = params.dateStart;
		project.limitTime = params.limitTime;
		project.details = params.details;

		project.save((err, projectStored) => {
			if(err) return res.status(500).send({message: "Error al guardar el documento." + err});

			if(!projectStored) return res.status(404).send({message: "Documento no se ha guardado"})

			return res.status(200).send({project:projectStored});
		});
	},

	getProject: function(req, res){
		var projectId = req.params.id;
		//metodo de mongoose para buscar por ID
		//Recibe dos parámetros, el id y una función callback
		
		if(!projectId) return res.status(404).send({message: "El Proyecto no existe"})
		Project.findById(projectId, (err, project) =>{
			if(err) return res.status(500).send({
				message: "Error al devolver los datos"});
			if (!project) return res.status(404).send({
				message: "El projecto no existe"})

			return res.status(200).send({
				project
			})
		})
	},

	getProjects: function(req, res){

		// find recibe como parámetro una condición de busqueda
		// Si no le pasamos nada los busca todos
		// Sort los organiza por lo que le pases, en este caso year
		Project.find({}).sort('year').exec((err, projects)=>{

			if (err) return res.status(500).send({
				message: "Error al devolver los datos"
			})

			if(!projects) return res.status(404).send({message:"No hay proyectos que mostrar"});

		return res.status(200).send({
			projects
		})

		})


	},

	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body;

		//con new:true hacemos que devuelva el objeto ya actualizado, sino traera el objeto antes de actualizarlo
		Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) =>{
			if(err) return res.status(500).send({
				message: "Error al actualizar"
			});

			if(!projectUpdated)	return res.status(404).send({
				message: "Archivo no encontrado"
			});

			return res.status(200).send({
			project: projectUpdated
			});
		});
	},

	deleteProject: function(req, res){
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectDeleted) =>{
			if(err) return res.status(500).send({
				message: "No se ha podido borrar el proyecto"
			})
			if(!projectDeleted) return res.status(404).send({
				message: "No se puede eliminar ese proyecto"
			})

			return res.status(200).send({
				project: projectDeleted
			})
		})
	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = "Imagen no encontrada..."

		if(req.files){
			var imagenPath = req.files.image.path;
			var fileNamesplit = imagenPath.split('\\');
			var fileName = fileNamesplit[1];
			var extSplit = fileName.split('\.')
			var file_ext = extSplit[1];

			if(file_ext == "jpg" || file_ext == "gif" || file_ext == "jpeg" || file_ext == "png"){

				Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) =>{
					if(err) return res.status(500).send({message:"No se ha podido enviar la imagen"})

					if(!projectUpdated) return res.status(404).send({message:"Imagen no encontrada"})		

					return res.status(200).send({project: projectUpdated});
					});
			}else{
				fs.unlink(imagenPath, (err) => {
					return res.status(200).send({message: "La extensión no es válida"});
				})
			}



			}else{

				return res.status(200).send({file: fileName});
			}
		
	},

	getImageFiles: function (req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file))
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				})
			}
		})
	},

	addDetails: function(req, res){
		var projectId = req.params.id;
		var update = req.body;

		//con new:true hacemos que devuelva el objeto ya actualizado, sino traera el objeto antes de actualizarlo
		Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) =>{
			if(err) return res.status(500).send({
				message: "Error al actualizar"
			});

			if(!projectUpdated)	return res.status(404).send({
				message: "Archivo no encontrado"
			});

			return res.status(200).send({
			project: projectUpdated
			});
		});
	},


}


	




module.exports = controller;