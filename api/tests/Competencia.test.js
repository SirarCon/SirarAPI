const mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
contador = require("../models/ContadorModel"),
helper = require("./helper"),
evento = require("../models/EventoModel"),
model = require('../models/CompetenciaModel'),
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


    it('debería salvar competencia', () => {
        mockingoose(model).toReturn(response, 'save');
        mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
        return model
            .create(body).then((res) => {
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
    mockingoose(model).toReturn(eventRes, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controller.modificarCompetencia, req, helper.resp)
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

  it('Listar Fases por Prueba en Evento y Fase', async () => {
    mockingoose(model).toReturn(reslistarCompetenciasEventoPruebaFase, 'find')
    const { res } = await expressRequestMock(controller.listarCompetenciasEventoPruebaFase, reqlistarCompetenciasEventoPruebaFase, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy(); 
  });

});