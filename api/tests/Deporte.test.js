const helper = require("./helper"),
mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
contador = require("../models/ContadorModel"),
deporte = require("../models/DeporteModel"),
model = require("../models/FederacionModel"),
prueba = require("../models/PruebaModel"),
controlador = require("../controllers/DeporteController"),
expressRequestMock = require('express-request-mock');



describe('Federación', () => {

    var body = {
        nombre: "Federación de Natación",
        activo: true
    };
    var response = body;

    var req = {
      ...helper.reqGeneral,
      body: body,
    }

    var bodyModificar = {
      _id: 1,
      correoPresidente: "ddd@gmail.com",
      ...body
    }

    var buscarFederacion = {
      params: { idFederacion: 1}
    }
    var reqModificarFederacion = { 
      ...buscarFederacion,
      body: bodyModificar,
    }

    it('debería salvar Federación', () => {
      mockingoose(model).toReturn(response, 'save');
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      return model
            .create(body).then((res) => {
              expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
            });
    });

    it('Crear federación', async () => {
        mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
        const { res } = await expressRequestMock(controlador.crearFederacion, req, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();
    });

    it('Modificar federación', async () => {
      mockingoose(model).toReturn(bodyModificar, 'findOneAndUpdate')
      const { res } = await expressRequestMock(controlador.modificarFederacion, reqModificarFederacion, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      });

    it('Leer Federacion', async () => {
      mockingoose(model).toReturn(bodyModificar, 'findOne')
      const { res } = await expressRequestMock(controlador.leerFederacion, buscarFederacion, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      });

    it('Lista Todas Federaciones', async () => {
      mockingoose(model).toReturn([bodyModificar], 'find')
      const { res } = await expressRequestMock(controlador.listaTodasFederaciones, helper.reqGeneral, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      });

    it('Leer Federacion Activa', async () => {
      mockingoose(model).toReturn(bodyModificar, 'findOne')
      const { res } = await expressRequestMock(controlador.leerFederacionActiva, buscarFederacion, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      });

    it('Lista Federaciones Activas', async () => {
      mockingoose(model).toReturn([bodyModificar], 'find')
      const { res } = await expressRequestMock(controlador.listaFederacionesActivas, helper.reqGeneral, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
      })
});


describe('Deporte', () => {

  var body = {
      nombre: "Natación",
      federacion: 1,
  };
  var response = body;

  var req = {
  ...helper.reqGeneral,
  body: body,
  }

  var bodyModificar = {
    _id: 1,
    activo: true,
    ...body
  }

  var buscarDeporte = {
    params: { idDeporte: 1, idFederacion: 1}
  }

  var reqModificarDeporte = { 
   ...buscarDeporte,
  body: bodyModificar,
  }



  it('Debería salvar Deporte', () => {
    mockingoose(deporte).toReturn(response, 'save');
    mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
    return deporte
          .create(body).then((res) => {
            expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
          });
  });

  it('Crear Deporte', async () => {
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      const { res } = await expressRequestMock(controlador.crearDeporte, req, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();
  });

  it('Modificar Deporte', async () => {
    mockingoose(deporte).toReturn(bodyModificar, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controlador.modificarDeporte, reqModificarDeporte, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    });

  it('Leer Deporte', async () => {
    mockingoose(deporte).toReturn(bodyModificar, 'findOne')
    const { res } = await expressRequestMock(controlador.leerDeporte, buscarDeporte, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    });

  it('Lista Todos Deportes', async () => {
    mockingoose(deporte).toReturn([bodyModificar], 'find')
    const { res } = await expressRequestMock(controlador.listarDeportes, helper.reqGeneral, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    });

  it('Leer Deporte Activo', async () => {
    mockingoose(deporte).toReturn([bodyModificar], 'find')
    const { res } = await expressRequestMock(controlador.leerDeporteActiva, buscarDeporte, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    });

  it('Lista Deportes Activos', async () => {
    mockingoose(deporte).toReturn([bodyModificar], 'find')
    const { res } = await expressRequestMock(controlador.listarDeportesActivas, helper.reqGeneral, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    })

  it('Lista Deportes X Federación', async () => {
    mockingoose(deporte).toReturn([bodyModificar], 'find')
    const { res } = await expressRequestMock(controlador.listarDeportesXFederacion, buscarDeporte, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    })

  it('Lista Deportes X Federación Activos', async () => {
    mockingoose(deporte).toReturn([bodyModificar], 'find')
    const { res } = await expressRequestMock(controlador.listarDeportesActivasXFederacion, buscarDeporte, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    })
})



describe('Pruebas', () => {

  var body = {
      nombre: " Hit 1 Natación",
      deporte: 1,
      tipo: 1,
      activo: true
  };
  var response = body;

  var req = {
    ...helper.reqGeneral,
    params: {idDeporte: 1},
    body: body,
  }

  var bodyModificar = {
    _id: 1,
    ...body
  }

  var buscarPruebas = {
    params: {idDeporte: 1}
  }
  var reqModificarPrueba = { 
    ...buscarPruebas,
    body: bodyModificar,
  }

  it('debería salvar prueba', () => {
    mockingoose(prueba).toReturn(response, 'save');
    mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
    return prueba
          .create(body).then((res) => {
            expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
          });
  });

  it('Crear prueba', async () => {
    mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
    mockingoose(deporte).toReturn(response, 'findOne');
    const { res } = await expressRequestMock(controlador.insertarPrueba, req, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
});

  it('Crear prueba existente', async () => {
      mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
      mockingoose(deporte).toReturn(response, 'findOne');
      mockingoose(prueba).toReturn(response, 'findOne');
      const { res } = await expressRequestMock(controlador.insertarPrueba, req, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeGreaterThan(0);
      expect(datos.exito).toBeFalsy();
  });

  it('Modificar prueba', async () => {
    mockingoose(prueba).toReturn(undefined, 'findOne');
    mockingoose(prueba).toReturn(bodyModificar, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controlador.modificarPrueba, reqModificarPrueba, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    });

  it('Lista Todas Pruebas', async () => {
    mockingoose(prueba).toReturn([bodyModificar], 'find')
    const { res } = await expressRequestMock(controlador.listarPruebas, buscarPruebas, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    });

  it('Lista Pruebas Activas', async () => {
    mockingoose(prueba).toReturn([bodyModificar], 'find')
    const { res } = await expressRequestMock(controlador.listarPruebasActivas, buscarPruebas, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();
    })
});