const helper = require("./helper"),
mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
contador = require("../models/ContadorModel"),
evento = require("../models/EventoModel"),
model = require('../models/CompetenciaModel'),
AtletaC = require('../models/AtletaCompetidorModel');
pruebaModel = require("../models/PruebaModel"),
controller = require("../controllers/CompetenciaController"),
expressRequestMock = require('express-request-mock');



describe('Competencia Atleta', () => {

var body = {
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

var reqEliminarAtletaCompetencia = {
  ...helper.reqGeneral,
  params: {idAtletaCompetencia: 1}
}

var responseFindOneAC = {
  _id: 1,
  ...body,
}

var response= body
var req = {
  ...helper.reqGeneral,
  body: body,
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

var atletaCompetidorBody = {
  atleta: 1,
  competencia: 1,
}
var reqCrearatletaCompetidor = {
  ...helper.reqGeneral,
  body: atletaCompetidorBody,
}

var reqListarAtletasCompetencia ={
  ...helper.reqGeneral,
  params:{ idCompetencia: 1,
  }
}
var respGroupListarAtletasCompetencia=[
  {      _idAtleta: 1, 
          nombre: 'Atleta prueba', 
          marcadores: {
              type:{
                    mteros: 100
                  }
          }}]

var reqListarDeportesXEvento ={
  ...helper.reqGeneral,
  params:{ idEvento: 1} 
}

var {prueba, ...bodyNoPrueba} = body;

var respfinddeportesXevento = [
  { prueba: {deporte: 1},
   ...bodyNoPrueba 
  }
]

var reqListarCategoriasDeporte = {
  ...helper.reqGeneral,
  params: {idDeporte: 1,
           idEvento: 1
  }
}
var resCategoriasXDeporte = [{
  prueba: 1,
  nombre: "100 Mts",
  genero: 1
}]

var reqlistarFasesxPruebaEvento = {
  ...helper.reqGeneral,
  params:{ idEvento: 1,
           idPrueba: 1,
           genero: 1
  }
}

var reslistarFasesxPruebaEvento = [{
fase:{_id: 1, descripcion: "Primera fase"}
}]


var reqlistarCompetenciasEventoPruebaFase = {
  ...helper.reqGeneral,
  params:{ idEvento: 1,
           idPrueba: 1,
           genero: 1,
           fase: 1
  }
}

var reslistarCompetenciasEventoPruebaFase = [{
...body
}]

var reqlistarDeportesEventosAtleta = {
  ...helper.reqGeneral,
  params:{ idAtleta: 1,
           idEvento: 1
  }
}
var reslistarDeportesEventosAtleta = [{
  _id: 1
}]

var reqlistarPruebasDeporteEventosAtleta = {
  ...helper.reqGeneral,
  params:{ idAtleta: 1,
           idEvento: 1,
           idDeporte: 1,
  }
}

var reslistarPruebasDeporteEventosAtleta =[{
    _id: 1,
    nombre: "100 mts",
    nombreNormalizado: "100mts"
}]

var reqlistarCompetenciasPorPruebaAtleta = {
  ...helper.reqGeneral,
  params:{ idAtleta: 1,
           idEvento: 1,
           idPrueba: 1,
  }
}

var reslistarCompetenciasPorPruebaAtleta =[{
  competencia:{ 
    _id: 1,
    descripcion: "100 mts",
    fase: {
      id: 1,
      descripcion: "Primera Fase",
      siglas: "PF"
      }
  }
}]


    it('debería salvar competencia atleta', () => {
      mockingoose(model).toReturn(response, 'save');
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      return model
            .create(body).then((res) => {
              expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
            });
    });


    it('Crea Competencia Atleta', async () => {
        mockingoose(evento).toReturn(eventRes, 'findOne')
        mockingoose(pruebaModel).toReturn(pruebaRes, 'findOne')
        mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
        const { res } = await expressRequestMock(controller.crearCompetencia, req, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();    
      });

    it('Modificar Competencia Atleta', async () => {
      mockingoose(model).toReturn(eventRes, 'findOneAndUpdate')
      const { res } = await expressRequestMock(controller.modificarCompetencia, req, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();  
    });

    it('Ingresar Atleta a Competencia', async () => {
      mockingoose(model).toReturn(responseFindOneAC, 'findOne')
      mockingoose(AtletaC).toReturn(0, 'estimatedDocumentCount')
      const { res } = await expressRequestMock(controller.ingresarAtletaACompetencia, reqCrearatletaCompetidor, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Eliminar Atleta de Competencia', async () => {
      mockingoose(AtletaC).toReturn(responseFindOneAC, 'findOneAndRemove')
      const { res } = await expressRequestMock(controller.eliminarAtletaDeCompetencia, reqEliminarAtletaCompetencia, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Listar Atletas en Competencia', async () => {
      mockingoose(AtletaC).toReturn(respGroupListarAtletasCompetencia, 'aggregate')
      const { res } = await expressRequestMock(controller.listarAtletasCompetencia, reqListarAtletasCompetencia, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Listar Deportes por Evento', async () => {
      model.schema.path('prueba', Object)//Emula el populate, sino retorna el objeto sin prueba  
      mockingoose(model).toReturn(respfinddeportesXevento, 'find')
      const { res } = await expressRequestMock(controller.listarDeportesXEvento, reqListarDeportesXEvento, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Listar Categorías por Deporte', async () => {
      mockingoose(model).toReturn(resCategoriasXDeporte, 'aggregate')
      const { res } = await expressRequestMock(controller.listarDeportesXEvento, reqListarCategoriasDeporte, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Listar Fases por Prueba en evento', async () => {
      mockingoose(model).toReturn(reslistarFasesxPruebaEvento, 'aggregate')
      const { res } = await expressRequestMock(controller.listarFasesxPruebaEvento, reslistarFasesxPruebaEvento, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Listar Fases por Prueba en Evento y Fase', async () => {
      mockingoose(model).toReturn(reslistarCompetenciasEventoPruebaFase, 'find')
      const { res } = await expressRequestMock(controller.listarCompetenciasEventoPruebaFase, reqlistarCompetenciasEventoPruebaFase, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Listar Fases por Prueba en Evento y Fase', async () => {
      mockingoose(AtletaC).toReturn(reslistarDeportesEventosAtleta, 'aggregate')
      const { res } = await expressRequestMock(controller.listarDeportesEventosAtleta, reqlistarDeportesEventosAtleta, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Listar Pruebas de atleta según deprte en Evento ', async () => {
      mockingoose(AtletaC).toReturn(reslistarPruebasDeporteEventosAtleta, 'aggregate')
      const { res } = await expressRequestMock(controller.listarPruebasDeporteEventosAtleta, reqlistarPruebasDeporteEventosAtleta, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Listar Pruebas de atleta según deprte en Evento ', async () => {
      mockingoose(AtletaC).toReturn(reslistarCompetenciasPorPruebaAtleta, 'aggregate')
      const { res } = await expressRequestMock(controller.listarCompetenciasPorPruebaAtleta, reqlistarCompetenciasPorPruebaAtleta, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });
});