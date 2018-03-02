'use strict';
module.exports = function(app) {
  var userController = require('../controllers/UserController');

  // todoList Routes
  app.route('/users')
    .get(userController.lista_todos_usuarios)
    .post(userController.crear_usuario);


  app.route('/users/:correo')
    .get(userController.leer_usuario)
    .put(userController.modificar_usuario)
    .delete(userController.borrar_usuario);
};
