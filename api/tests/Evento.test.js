const helper = require("./helper"),
mockingoose = require('mockingoose').default,
contador = require("../models/ContadorModel"),
ateltac = require("../models/AtletaCompetidorModel"),
model = require("../models/EventoModel"),
controller = require("../controllers/EventoController"),
expressRequestMock = require('express-request-mock');

var body = {
        nombre: "Tokio 2020",
        fechaInicio: "07/07/2020",
        fechaFinal: "07/08/2020",
        ciudad: "Tokio",
        activo: true
};
var response = body;

describe('Evento', () => {
    it('debería salvar Evento', () => {
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

describe('Crear Evento', () => { 
    it('returns a 200 response', async () => {
        mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
        const { res } = await expressRequestMock(controller.crearEvento, req, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200)
    })
})