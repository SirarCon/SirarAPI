const mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
contador = require("../models/ContadorModel"),
helper = require("./helper"),
prueba = require("../models/PruebaModel"),
competencia = require("../models/CompetenciaModel"),
equipoC = require("../models/EquipoCompetidorModel"),
evento = require("../models/EventoModel"),
atleta = require("../models/AtletaModel"),
model = require("../models/EquipoModel"),
equipoService = require("../services/EquipoService"),
controller = require("../controllers/EquipoController"),
expressRequestMock = require('express-request-mock');


jest.mock("../services/EquipoService")



//#region objetos y requests

var bodyCrearEquipo= { //Objeto con el body completo para reutilizarlo
    prueba: 1,
    pais: 1,
    activo: true,
    evento: 1,
    pais: 840,
    retirado: true,
    genero: 0,
  }
  //Se extrae solo el rol , pues el objeto de respuesta no lo retorna
  var  { ...responseLuegoCrearEquipo} = bodyCrearEquipo;
  //Objeto para enviar al modelo Equipo de mongo, se usa el spread operator para completarlo
  var nuevoEquipo = {
    _id: 1,
    ...bodyCrearEquipo,
  }
  //Objeto para enviar al controller de Equipo
  var reqNuevoEquipo = {
    ...helper.reqGeneral,
    body: bodyCrearEquipo,
  }
  //Objeto para modificar equipo
  var {rol, correo , ...bodyModificarEquipo} = bodyCrearEquipo
  var correoModificado ={ correo: 'wacvillalobggos@hotmail.es'}
  //Objeto para enviar al controller modificar
  var reqModificarEquipo = {
    ...helper.reqGeneral,
    body: {
      _id: 1,
      ...bodyModificarEquipo,
      correoModificado
    },
  }
  var pruebaRes ={
      _id: 1,
  }
  var eventoRes ={
    _id: 1,
  }

  var atletaRes ={
    _id: 1,
  }
  
  var responseListarEquipos = [
    {
      _id: 1,
      prueba: 1,
      pais: 1,
      activo: true,
      evento: 1,
      pais: 840,
      retirado: true,
    }
  ]
  var reqLeerEquipo = {
    ...helper.reqGeneral,
    params:{ 
      id: 1
    } 
  }
  var responseLeerEquipo={
      _id: 1,
     ...bodyCrearEquipo
  }

  var atletasActualizados = { 
      ...nuevoEquipo,
    atletas: [1,2,3]
  }


  var medallasActualizadas = { 
    ...nuevoEquipo,
    medallas: [{
        _id: "5e8131e4dbdc2009e5bbb861",
        prueba: 1,
        posicion: 1,
        evento: 1
    }]
}


  //#endregion objetos y requests
  
  //#region tests
  describe('Equipo Model', () => {
    it('Guardar Equipo en mongo', () => {
      mockingoose(model).toReturn(nuevoEquipo, 'save');
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      return model
            .create(nuevoEquipo).then((res) => {
              expect(JSON.parse(JSON.stringify(res))).toMatchObject(responseLuegoCrearEquipo)
            });
    });
  
    it('Crear equipo', async () => {
      mockingoose(prueba).toReturn(pruebaRes, 'findOne')
      mockingoose(evento).toReturn(eventoRes, 'findOne')
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      const { res } = await expressRequestMock(controller.crearEquipo, reqNuevoEquipo, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      expect(res.statusCode).toEqual(200)
    })
  
    it('Modificar equipo', async () => {
        mockingoose(prueba).toReturn(pruebaRes, 'findOne')
        mockingoose(evento).toReturn(eventoRes, 'findOne') 
        mockingoose(model).toReturn({...bodyModificarEquipo, correoModificado}, 'findOneAndUpdate')
        const { res } = await expressRequestMock(controller.modificarEquipo, reqModificarEquipo, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();
        expect(res.statusCode).toEqual(200)
    })
  
    it('Listar equipo', async () => {
      mockingoose(model).toReturn(responseListarEquipos, 'find')
      const { res } = await expressRequestMock(controller.listarEquipos, helper.reqGeneral, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
  
    })
    
    it('Listar equipo específico', async () => {
      mockingoose(model).toReturn(responseLeerEquipo, 'findOne')
      const { res } = await expressRequestMock(controller.leerEquipo, reqLeerEquipo, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      expect(res.statusCode).toEqual(200)
    })
  
    it('Listar equipos activos', async () => {
      mockingoose(model).toReturn(responseListarEquipos, 'find')
      const { res } = await expressRequestMock(controller.listarEquiposActivos, helper.reqGeneral, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      expect(res.statusCode).toEqual(200)
    })
    
    it('Listar equipo equipo específico', async () => {
      mockingoose(model).toReturn(responseLeerEquipo, 'findOne')
      const { res } = await expressRequestMock(controller.leerEquipoActivo, reqLeerEquipo, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      expect(res.statusCode).toEqual(200)
    })
  
    it('Modificar medallas', async ()=>{
        mockingoose(prueba).toReturn(pruebaRes, 'findOne')
        mockingoose(evento).toReturn(eventoRes, 'findOne')
        mockingoose(model).toReturn(medallasActualizadas, 'findOneAndUpdate')
        const { res } = await expressRequestMock(controller.modificarMedalla, helper.reqGeneral, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();
        expect(res.statusCode).toEqual(200)
    })

    it('Modificar atletas', async ()=>{
        mockingoose(atleta).toReturn(atletaRes, 'findOne')
        mockingoose(model).toReturn(atletasActualizados, 'findOneAndUpdate')
        const { res } = await expressRequestMock(controller.modificarAtletas, helper.reqGeneral, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();
        expect(res.statusCode).toEqual(200)
    })

  });
  
