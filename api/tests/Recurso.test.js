const helper = require("./helper"),
mockingoose = require('mockingoose').default,
contador = require("../models/ContadorModel"),
pais = require("../models/PaisModel"),
fase = require("../models/FaseModel"),
controlador = require("../controllers/RecursoController"),
expressRequestMock = require('express-request-mock');

var body = {
    name: "Costa Rica",
    _id: 506,
    flag: "Azul"
};
var response = body;

describe('Pais', () => {
    it('debería salvar País', () => {
      mockingoose(pais).toReturn(response, 'save');
      return pais
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

describe('Crear País', () => { 
    it('returns a 200 response', async () => {
        const { res } = await expressRequestMock(controlador.crearPais, req, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200)
    })
})