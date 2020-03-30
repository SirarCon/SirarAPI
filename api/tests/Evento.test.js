const mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
contador = require("../models/ContadorModel"),
helper = require("./helper"),
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

var { activo, ...bodyModificar} = body;

bodyModificar = { activo:false, ...bodyModificar}

var reqCrearEvento = {
  ...helper.reqGeneral,
  body: body,
}

var reqModificarEvento = {
  ...helper.reqGeneral,
  body: bodyModificar,
}

var reqLeerEvento = {
  ...helper.reqGeneral,
  params:{ 
    id: 1
  } 
}
var responseLeerEvento={
    _id: 1,
    ...body,
}

var responseLeerTodosEventos = [
  {...responseLeerEvento},
]

var reqLeerEventosXAtleta = {
  ...helper.reqGeneral,
  params:{ 
    idAtleta: 1
  } 
}

var responseEventosPorAtleta = [{
        "id": 1,
        "nombre": "Juegos Olímpicos de Río de Janeiro 2016",
}]

describe('Evento', () => {
    it('debería salvar Evento', () => {
      mockingoose(model).toReturn(body, 'save');
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      return model
            .create(body).then((res) => {
              expect(JSON.parse(JSON.stringify(res))).toMatchObject(body)
            });
    });

  it('Crean Evento', async () => {
    mockingoose(contador).toReturn({sequence_value: 1}, 'findByIdAndUpdate')
    const { res } = await expressRequestMock(controller.crearEvento, reqCrearEvento, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
  });

  it('Modificar Evento', async () => {
    mockingoose(model).toReturn(bodyModificar, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controller.modificarEvento, reqModificarEvento, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
  });

  it('Leer Evento', async () => {
    mockingoose(model).toReturn(responseLeerEvento, 'findOne')
    const { res } = await expressRequestMock(controller.leerEvento, reqLeerEvento, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
  });

  it('Listar Todos Eventos', async () => {
    mockingoose(model).toReturn(responseLeerTodosEventos, 'find')
    const { res } = await expressRequestMock(controller.listarTodosEventos, helper.reqGeneral, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
  });

  it('Listar Todos Eventos Activos', async () => {
    mockingoose(model).toReturn(responseLeerTodosEventos, 'find')
    const { res } = await expressRequestMock(controller.listarEventosActivos, helper.reqGeneral, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
  });

  it('Leer Evento Activo', async () => {
    mockingoose(model).toReturn(responseLeerEvento, 'findOne')
    const { res } = await expressRequestMock(controller.leerEventoActivo, reqLeerEvento, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
  });

  it('listar Eventos Atleta', async () => {
    mockingoose(ateltac).toReturn(responseEventosPorAtleta, 'aggregate')
    const { res } = await expressRequestMock(controller.listarEventosAtleta, reqLeerEventosXAtleta, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
  });


})