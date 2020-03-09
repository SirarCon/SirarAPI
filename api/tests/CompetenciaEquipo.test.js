const helper = require("./helper"),
mockingoose = require('mockingoose').default,
contador = require("../models/ContadorModel"),
evento = require("../models/EventoModel"),
model = require('../models/CompetenciaAtletaModel'),
AtletaC = require('../models/AtletaCompetidorModel');
EquipoC = require('../models/EquipoCompetidorModel');
prueba = require("../models/PruebaModel"),
controller = require("../controllers/CompetenciaEquipoController"),
expressRequestMock = require('express-request-mock');

var body = {
        evento: 1,
        prueba: 1,
        fechaHora: '2016-08-05T08:00:00.000Z',
        ciudad: 'Tokio',
        estadio: 'Tokio Stadium',
        genero: 1,
        descripcion: 'Hit 1',
        fase: 2,
        activo: 1
}
var response= {
    evento: 1,
    prueba: 1,
    fechaHora: '2016-08-05T08:00:00.000Z',
    ciudad: 'Tokio',
    estadio: 'Tokio Stadium',
    genero: 1,
    descripcion: 'Hit 1',
    fase: 2,
    activo: true
}

describe('Competencia Atleta', () => {
    it('debería salvar competencia atleta', () => {
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
var eventRes= {
    "_id" : 1,
    "nombre" : "Juegos Olímpicos de Río de Janeiro 2016",
    "fechaInicio" : "2016-08-05T00:00:00Z", 
    "fechaFinal" : "2016-08-21T00:00:00Z",
    "ciudad" : "Río",
    "pais" : 76,
    "fotoUrl" : "imagenes/imagenesEventos/5c8719d7d3cb6b0015814b91.jpeg",
    "activo" : 1,
    "nombreNormalizado" : "juegosolimpicosderiodejaneiro2016"
}

var pruebaRes={
            "id": 1,
            "nombre": "200 mts",
            "deporte": 2,
            "activo": 1
}

describe('Crear Competencia Atleta ', () => { 
    it('returns a 200 response', async () => {
        mockingoose(evento).toReturn(eventRes, 'findOne')
        mockingoose(prueba).toReturn(pruebaRes, 'findOne')
        mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
        const { res } = await expressRequestMock(controller.crearCompetenciaAtleta, req, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200)
    })
})