const helper = require("./helper"),
mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
model = require("../models/UserModel"),
controlador = require("../controllers/UserController"),
expressRequestMock = require('express-request-mock');

var body = {
    nombre: "William",
    identificacion: "1-1234-556",
    correo: "dkfoefkrocvn",
    rol: 2,
};

var response = body;

describe('Usuario', () => {
    it('debería salvar Usuario', () => {
      mockingoose(model).toReturn(response, 'save');
      return model
            .create(body).then((res) => {
              expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
            });
    });
  });


var req = {
    locals: helper.locals,
    body: body,
    token: 'd89fgk'
}

describe('Crear Usuario', () => { 
    it('returns a 200 response', async () => {
        const { res } = await expressRequestMock(controlador.crearUsuario, req, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200)
    })
})