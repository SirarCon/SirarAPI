const mockingoose = require('mockingoose').default,
contador = require("../models/ContadorModel"),
error = require("../models/ErrorModel"),
helper = require("./helper"),
evento = require("../models/EventoModel"),
model = require('../models/CompetenciaModel'),
EquipoC = require('../models/EquipoCompetidorModel');
prueba = require("../models/PruebaModel"),
controller = require("../controllers/EquipoCompetidorController"),
expressRequestMock = require('express-request-mock');

describe('Equipo Competidor', () => {

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
  
  var reqEliminarEquipoCompetencia = {
    ...helper.reqGeneral,
    params: {idEquipoCompetencia: 1}
  }
  
  var responseFindOneAC = {
    _id: 1,
    ...body,
  }
  
  var equipoCompetidorBody = {
    equipo: 1,
    competencia: 1,
  }

  var equipoCompetidorBody2 = {
    equipo: 2,
    competencia: 1,
  }

  var equipoCompetidorBody3 = {
    equipo: 3,
    competencia: 1,
  }

  var reqCrearequipoCompetidor = {
    ...helper.reqGeneral,
    body: equipoCompetidorBody,
  }
  
  var reqCrearequiposCompetidores = {
    ...helper.reqGeneral,
    body:{ equipos: [
            equipoCompetidorBody,
            equipoCompetidorBody2,
            equipoCompetidorBody3
          ],
        }
  }

  var reqListarEquiposCompetencia ={
    ...helper.reqGeneral,
    params:{ idCompetencia: 1,
    }
  }
  var respGroupListarEquiposCompetencia=[
    {
      "_id": {
          "equipo": 1,
          "marcadores": [
              {
                  "_id": "5e7eb65b008f3504f9c27659",
                  "esUltimoRegistro": false,
                  "set": 1,
                  "puntos": 1,
                  "momentoTiempo": {
                      "minuto": "12",
                      "segundo": "25"
                  },
                  "tipo": 1
              },
              {
                  "_id": "5e7eb66d008f3504f9c2765a",
                  "esUltimoRegistro": false,
                  "set": 1,
                  "puntos": 2,
                  "momentoTiempo": {
                      "minuto": "40",
                      "segundo": "09"
                  },
                  "tipo": 1
              },
              {
                  "_id": "5e7eb68e008f3504f9c2765d",
                  "esUltimoRegistro": false,
                  "set": 2,
                  "puntos": 2,
                  "momentoTiempo": {
                      "minuto": "90",
                      "segundo": "23"
                  },
                  "tipo": 1
              },
              {
                  "_id": "5e7eb6b9008f3504f9c2765e",
                  "esUltimoRegistro": true,
                  "puntos": 2,
                  "tipo": 1
              }
          ]
      },
      "pais": 388
  }]
  
  var reqlistarDeportesEventosEquipo = {
    ...helper.reqGeneral,
    params:{ idEquipo: 1,
             idEvento: 1
    }
  }
  var reslistarDeportesEventosEquipo = [{
    _id: 1
  }]
  
  var reqlistarPruebasDeporteEventosEquipo = {
    ...helper.reqGeneral,
    params:{ idEquipo: 1,
             idEvento: 1,
             idDeporte: 1,
    }
  }
  
  var reslistarPruebasDeporteEventosEquipo =[{
      _id: 1,
      nombre: "100 mts",
      nombreNormalizado: "100mts"
  }]
  
  var reqlistarCompetenciasPorPruebaEquipo = {
    ...helper.reqGeneral,
    params:{ idEquipo: 1,
             idEvento: 1,
             idPrueba: 1,
    }
  }
  
  var reslistarCompetenciasPorPruebaEquipo =[{
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


var resMarcadores = {
  _id: 6,
  equipo: 5,
  competencia: 1,
  esLocal: 0,
  marcadores: [
    {
      _id: "5e7d7d702df756081135ccc9",
      esUltimoRegistro: false,
      set: 1,
      tiempo: [Object],
      tipo: 2
    },
  ]
}

var reqModificarMarcador = {
  ...helper.reqGeneral,
  params:{
    agregar: 1,
    idMarcador: "5e7d7d702df756081135ccc9"
  }
}
      
      it('Ingresar Equipo a Competencia', async () => {
        mockingoose(model).toReturn(responseFindOneAC, 'findOne')
        mockingoose(EquipoC).toReturn(undefined, 'findOne')
        const { res } = await expressRequestMock(controller.ingresarEquipoACompetencia, reqCrearequipoCompetidor, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy(); 
      });

      it('Ingresar Equipos a Competencia', async () => {        
        const { res } = await expressRequestMock(controller.ingresarEquiposACompetencia, reqCrearequiposCompetidores, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy(); 
      });
  
      it('Eliminar Equipo de Competencia', async () => {
        mockingoose(EquipoC).toReturn(responseFindOneAC, 'findOneAndRemove')
        const { res } = await expressRequestMock(controller.eliminarEquipoDeCompetencia, reqEliminarEquipoCompetencia, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy(); 
      });
  
      it('Listar Equipos en Competencia', async () => {
        mockingoose(EquipoC).toReturn(respGroupListarEquiposCompetencia, 'aggregate')
        const { res } = await expressRequestMock(controller.listarEquiposCompetencia, reqListarEquiposCompetencia, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy(); 
      });
  
    it('Listar Fases por Prueba en Evento y Fase', async () => {
      mockingoose(EquipoC).toReturn(reslistarDeportesEventosEquipo, 'aggregate')
      const { res } = await expressRequestMock(controller.listarDeportesEventosEquipo, reqlistarDeportesEventosEquipo, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });
  
    it('Listar Pruebas de equipo según deprte en Evento ', async () => {
      mockingoose(EquipoC).toReturn(reslistarPruebasDeporteEventosEquipo, 'aggregate')
      const { res } = await expressRequestMock(controller.listarPruebasDeporteEventosEquipo, reqlistarPruebasDeporteEventosEquipo, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });
  
    it('Listar Pruebas de equipo según deprte en Evento ', async () => {
      mockingoose(EquipoC).toReturn(reslistarCompetenciasPorPruebaEquipo, 'aggregate')
      const { res } = await expressRequestMock(controller.listarCompetenciasPorPruebaEquipo, reqlistarCompetenciasPorPruebaEquipo, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

    it('Modificar marcadores', async () => {
      mockingoose(EquipoC).toReturn(resMarcadores, 'findOneAndUpdate')
      const { res } = await expressRequestMock(controller.modificarMarcadores, reqModificarMarcador, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy(); 
    });

  });