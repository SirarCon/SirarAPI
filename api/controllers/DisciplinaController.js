'use strict';

//#region Requires
var mongoose = require('mongoose');
var Disciplina = mongoose.model('Disciplina');
const AwtAuth = require('jsonwebtoken');
var globales =  require("../Globales.js");
const rutaImagenesDeportes = globales.rutaImagenesDeportes.instance;
const rutaImagenesFederaciones = globales.rutaImagenesFederaciones.instance;
//#endregion Requires

exports.listarDisciplinasGeneral = async function(req, res){}

exports.listarDisciplinas = async function(req, res){}
exports.crearDisciplina = async function(req, res){}

exports.leerDisciplina = async function(req, res){}
exports.modificarDisciplina = async function(req, res){}
exports.borrarDisciplina = async function(req, res){}
