const helper = require("./helper"),
mockingoose = require('mockingoose').default,
contador = require("../models/ContadorModel"),
pais = require("../models/PaisModel"),
fase = require("../models/FaseModel"),
controlador = require("../controllers/RecursoController"),
expressRequestMock = require('express-request-mock');


describe('Pais', () => {
  var bodyPais = {
    name: "Costa Rica",
    _id: 506,
    flag: "Azul"
  };
  var response = bodyPais;

  var reqPais = {
    ...helper.reqGeneral,
    body: bodyPais,
  }
    it('debería salvar País', () => {
      mockingoose(pais).toReturn(response, 'save');
      return pais
            .create(bodyPais).then((res) => {
              expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
            });
    });   
    it('Crear País', async () => {
        const { res } = await expressRequestMock(controlador.crearPais, reqPais, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();    })

    it('Borrar País', async () => {
      mockingoose(pais).toReturn(response, 'findOneAndRemove');
      const { res } = await expressRequestMock(controlador.borrarPais, reqPais, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();  })

      it('Obtener Países', async () => {
        mockingoose(pais).toReturn([response], 'find');
        const { res } = await expressRequestMock(controlador.obtenerPaises, helper.reqGeneral, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();  })
});



describe('Fase', () => {
  var bodyFase = {
    descripcion: "Cuartos de Final",
    _id: 3,
    siglas: "Qty"
  };
  var response = bodyFase;

  var reqFase = {
    ...helper.reqGeneral,
    body: bodyFase,
  }
    it('debería salvar Fase', () => {
      mockingoose(fase).toReturn(response, 'save');
      return fase
            .create(bodyFase).then((res) => {
              expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
            });
    });   
    it('Crear Fase', async () => {
        const { res } = await expressRequestMock(controlador.crearFase, reqFase, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();    })

    it('Borrar Fase', async () => {
      mockingoose(fase).toReturn(response, 'findOneAndRemove');
      const { res } = await expressRequestMock(controlador.borrarFase, reqFase, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();  })

      it('Obtener Fases', async () => {
        mockingoose(fase).toReturn([response], 'find');
        const { res } = await expressRequestMock(controlador.obtenerFases, helper.reqGeneral, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();  })
})