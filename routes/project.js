'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();
//Para subir imagenes debemos de configurar el connel-multiparty
/*Primero lo exportamos y lo llamamos como método pasandole
un JSON de la ruta donde se guararán las imágenes*/
// Luego colocarlo como un Middleware que se ejecutará antes del método del controlador.
var multipart = require('connect-multiparty')
var MultipartyMidleware = multipart({ uploadDir:'./uploads' })


router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload/:id', MultipartyMidleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFiles);
// El signo de interrogación convierte la variable en opcional
// De lo contrario es obligatoria
module.exports = router;