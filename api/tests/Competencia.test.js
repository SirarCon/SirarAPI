const mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
contador = require("../models/ContadorModel"),
helper = require("./helper"),
evento = require("../models/EventoModel"),
model = require('../models/CompetenciaModel'),
pruebaModel = require("../models/PruebaModel"),
fase = require("../models/FaseModel"),
ateltaC = require("../models/AtletaCompetidorModel"),
equipoC = require("../models/EquipoCompetidorModel"),
equipo = require("../models/EquipoModel"),
notificacionCompetencia = require("../models/NotificacionCompetenciaModel"),
controller = require("../controllers/CompetenciaController"),
expressRequestMock = require('express-request-mock');

describe('Competencia Atleta', () => {
    var body = {
        _id: 1,
        evento: 1,
        prueba: 1,
        fechaHora: '2016-08-05T08:00:00.000Z',
        ciudad: 'Tokio',
        recinto: 'Tokio Stadium',
        genero: 1,
        descripcion: 'Hit 1',
        activo: true
    } 
    var bodyCrear = {
      ...body,
      fase: 1,
    }

    var response= body
    var req = {
      ...helper.reqGeneral,
      body: {
        ...body,
        fase: 2,
      },
    }
    var eventRes= {
      "_id" : 1,
      "nombre" : "Juegos Olímpicos de Río de Janeiro 2016",
      "fechaInicio" : "2016-08-05T00:00:00Z", 
      "fechaFinal" : "2016-08-21T00:00:00Z",
      "ciudad" : "Ro",
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
      
      var reqListarPruebasDeporte = {
        ...helper.reqGeneral,
        params: {idDeporte: 1,
                 idEvento: 1
        }
      }
      var resPruebasXDeporte = [{
        prueba: 1,
        nombre: "100 Mts",
        genero: 1
      }]
      
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

      var reqleerCompetencia = {
        ...helper.reqGeneral,
        params:{ idCompetencia: 1,
        }
      }
      
      var reslistarCompetenciasEventoPruebaFase = [{
      ...body, fase: {_id: 2, descripcion: "Semifinal"},

      }]

      var responseNotiComp = [];
      var competenciaPopulate = reslistarCompetenciasEventoPruebaFase[0];

      console.log(JSON.stringify(competenciaPopulate) + "fff")

    it('debería salvar competencia', () => {
        mockingoose(model).toReturn(response, 'save');
        mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
        return model
            .create(bodyCrear).then((res) => {
                expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
            });
    });

  it('Crea Competencia', async () => {
      mockingoose(evento).toReturn(eventRes, 'findOne')
      mockingoose(pruebaModel).toReturn(pruebaRes, 'findOne')
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      const { res } = await expressRequestMock(controller.crearCompetencia, req, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();    
    });

  it('Modificar Competencia', async () => {
    mockingoose(model).toReturn(competenciaPopulate, 'findOneAndUpdate')
    mockingoose(model).toReturn(competenciaPopulate, 'populate')
    const { res } = await expressRequestMock(controller.modificarCompetencia, req, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();  
  });

  it('Activar Competencia', async () => {
    mockingoose(model).toReturn(competenciaPopulate, 'findOneAndUpdate')
    await mockingoose(model).toReturn(competenciaPopulate, 'populate')

    const { res } = await expressRequestMock(controller.cambiarEstadoCompetencia, req, helper.resp)
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
    mockingoose(model).toReturn(resPruebasXDeporte, 'aggregate')
    const { res } = await expressRequestMock(controller.listarPruebasXDeporte, reqListarPruebasDeporte, helper.resp)
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

  it('Listar competencias por Prueba en Evento y Fase', async () => {
    mockingoose(model).toReturn(reslistarCompetenciasEventoPruebaFase, 'find')
    mockingoose(notificacionCompetencia).toReturn(responseNotiComp, 'find');
    const { res } = await expressRequestMock(controller.listarCompetenciasEventoPruebaFase, reqlistarCompetenciasEventoPruebaFase, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy(); 
  });

  it('Leer competencia', async () => {
    mockingoose(model).toReturn(reslistarCompetenciasEventoPruebaFase, 'findOne')
    mockingoose(notificacionCompetencia).toReturn(responseNotiComp, 'find');
    mockingoose(model).toReturn(competenciaPopulate, 'populate')
    const { res } = await expressRequestMock(controller.leerCompetencia, reqleerCompetencia, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy(); 
  });

});