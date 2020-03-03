
const mockingoose = require('mockingoose').default;
const contador = require("../models/ContadorModel");
const Mensaje = require("../models/MensajeModel");
const deporte = require("../models/DeporteModel");
const globales = require("../Globales");
const model = require("../models/AtletaModel");
const subject = require("../controllers/AtletaController");
const expressRequestMock = require('express-request-mock');
const mongoose = require('mongoose');
jest.mock("../Globales")

const mMock = jest.fn(()=> new Mensaje({"mensaje": "{sutantivoCambiar} {id} se ha creado.", "codigo": -4, "exito": 1 }));


const response = {
  "_id": 1,
  "nombre": "Foo",
  "fotoUrl": "",
  "correo": "Foo@hotmail.es",
  "deporte": 1,
  "pais": 840
}
const deporteResponse = {
            "id": 1,
            "nombre": "Ajedrez",
            "imagenDeporteUrl": "",
            "activo": true,
            "federacion": 1
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


// describe('Atletas Copntrollee', () => {
//   it('debería salvar atleta', () => {
//     mockingoose(deporte).toReturn(deporteResponse, 'findOne');
//     mockingoose(model).toReturn(response, 'save');
//     mockingoose(contador).toReturn({sequence_value: 1}, 'findOneAndUpdate')
//     return atletaController
//           .crearAtleta().then((res) => {
//             expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
//           });
//   });
// });

var req = {
  locals: {
    token: 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoic2xheEdVRjdXc1BIYlJYMHluMDQzeHZmWmQxSXlVMWl1dnJ3WkdudUdNbFd1TjQ4VjQiLCJpYXQiOjE1ODIwODQ2NDYsImV4cCI6MTU4MjA4NzY0Nn0.K1dbac-CAN80onOQhr7eAS_XEGNToebZMZOxjf-ucOA'
  },
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

var depReq ={
    _id: 1,
    nombre: 'Ajedrez',
    nombreNormalizado: 'ajedrez',
    imagenDeporteUrl: '',
    federacion: 1,
    activo: true,
}

describe(' Atletas Copntroller', () => { 
    it('returns a 200 response', async () => {
      globales.mensajes.mockImplementationOnce(() =>  mMock);
      mockingoose(deporte).toReturn(depReq, 'findOne')
      const { res } = await expressRequestMock(subject.crearAtleta, req)
      expect(res.statusCode).to.equal(200)
    })
})