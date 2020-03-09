const helper = require("./helper"),
mockingoose = require('mockingoose').default,
contador = require("../models/ContadorModel"),
deporte = require("../models/DeporteModel"),
model = require("../models/FederacionModel"),
prueba = require("../models/PruebaModel"),
controlador = require("../controllers/DeporteController"),
expressRequestMock = require('express-request-mock');

var body = {
        nombre: "Natación",
        activo: true
};
var response = body;

describe('Competencia Atleta', () => {
    it('debería salvar Federación', () => {
      mockingoose(model).toReturn(response, 'save');
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
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

describe('Crear Federación', () => { 
    it('returns a 200 response', async () => {
        mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
        const { res } = await expressRequestMock(controlador.crearFederacion, req, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200)
    })
})