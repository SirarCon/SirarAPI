const helper = require("./helper");
const mockingoose = require('mockingoose').default;
const contador = require("../models/ContadorModel");
const deporte = require("../models/DeporteModel");
const model = require("../models/AtletaModel");
const controller = require("../controllers/AtletaController");
const expressRequestMock = require('express-request-mock');

const response = {
  "_id": 1,
  "nombre": "Foo",
  "fotoUrl": "",
  "correo": "Foo@hotmail.es",
  "deporte": 1,
  "pais": 840
}

describe('Atletas Model', () => {
  it('debería salvar atleta', () => {
    mockingoose(model).toReturn(response, 'save');
    mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
    return model
          .create({
            "activo": 1,
            "nombre": "Foo",
            "fotoUrl": "",
            "correo": "test@hotmail.es",
            "edad": 0,
            "deporte": {
                "_id": 1,
                "federacion": 1
            },
            "pais": 840
          }).then((res) => {
            expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
          });
  });
});

var req = {
  locals: helper.locals,
  body: {
    nombre: 'TestExitoso3',
    correo: 'wacvillalobggos@kotmail.es',
    activo: '1',
    deporte: '1',
    rol: '0',
    pais: '840'
  },
  token: 'd89fgk',
}

var depRes ={
    _id: 1,
    nombre: 'Ajedrez',
    nombreNormalizado: 'ajedrez',
    imagenDeporteUrl: '',
    federacion: 1,
    activo: true,
}

describe('Crear Atleta ', () => { 
    it('returns a 200 response', async () => {
      mockingoose(deporte).toReturn(depRes, 'findOne')
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      const { res } = await expressRequestMock(controller.crearAtleta, req, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200)
    })
})