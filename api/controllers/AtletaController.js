'use strict';

//#region Requires
var mongoose = require('mongoose');
var Atleta = mongoose.model('Atleta');
const AwtAuth = require('jsonwebtoken');
var globales =  require("../Globales.js");
const rutaImagenesAtletas = globales.rutaImagenesAtletas.instance;
//#endregion Requires

exports.listarAtletas = async function(req, res){}
exports.crearAtleta = async function(req, res){}



exports.leerAtleta  = async function(req, res){}
exports.modificarAtleta  = async function(req, res){}
exports.borrarAtleta  = async function(req, res){}
