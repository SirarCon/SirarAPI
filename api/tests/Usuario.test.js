const mockingoose = require('mockingoose').default,
error = require("../models/ErrorModel"),
helper = require("./helper"),
model = require("../models/UsuarioModel"),
//usuarioService = require("../services/UsuarioService.js"),
controlador = require("../controllers/UsuarioController"),
expressRequestMock = require('express-request-mock');
//jest.mock("../services/UsuarioService.js")

var body = {
    nombre: "William",
    identificacion: "1-1234-556",
    correo: "dkfoefkrocvn@SirarCon.com",
    rol: 2,
};

var response = body;

var req = {
    locals: helper.locals,
    body: body,
    token: 'd89fgk'
}

var reqVerificarLogin = {
  ...req,
  body:{
    ...body,
    password: "1",
    tokenPassword:"123456789123456"
   }
}

var reqPasswordDistinta = {
  ...req,
  body:{
    ...body,
    tokenPassword:"123456789123456",
   }
}

var reqPasswordIgual = {
  ...req,
  body:{
    ...body,
    password:"1",
    passwordVieja: "1",
   }
}

var resVerificarLogin ={
  ...body,
  password: "1",
}

var reqGeneralUsuario ={
  ...helper.reqGeneral,
  params:{
    identificacion: "1",
  }
} 

const mMock = jest.fn().mockResolvedValue(req);


describe('Crear Usuario', () => {
  
    it('debería salvar Usuario', () => {
      mockingoose(model).toReturn(response, 'save');
      return model
            .create(body).then((res) => {
              expect(JSON.parse(JSON.stringify(res))).toMatchObject(response)
            });
    });

    // it('returns a 200 response', async () => {
    //   // const sendMailMock = jest.fn(); // this will return undefined if .sendMail() is called
    //   // const mailSenderCrear = jest.fn();
    //   // // In order to return a specific value you can use this instead
    //   // // const sendMailMock = jest.fn().mockReturnValue(/* Whatever you would expect as return value */);
      
    //   // jest.mock("nodemailer");
    //   // const nodemailer = require("nodemailer"); //doesn't work with import. idk why
    //   // nodemailer.createTransport.mockReturnValue({"sendMail": sendMailMock});
      
    //   // beforeEach( () => {
    //   //     sendMailMock.mockClear();
    //   //     nodemailer.createTransport.mockClear();
    //   // });      
    //   usuarioService.mailSenderCrear.mockImplementation(() => {
    //       return {
    //         mailSenderCrear: mMock
    //       };
    //     });
    //     const { res } = await expressRequestMock(controlador.crearUsuario, req, helper.resp)
    //     const { token, datos } = JSON.parse(res._getData());
    //     expect(res.statusCode).toEqual(200);
    //     expect(datos.codigo).toBeLessThan(0);
    //     expect(datos.exito).toBeTruthy();    
    //   })

        it('Verificar Usuario', async () => {
          mockingoose(model).toReturn(resVerificarLogin, 'findOne')
            const { res } = await expressRequestMock(controlador.verificarLogin, reqVerificarLogin, helper.resp)
            const { token, datos } = JSON.parse(res._getData());
            expect(res.statusCode).toEqual(200);
            expect(datos.codigo).toBeLessThan(0);
            expect(datos.exito).toBeTruthy();   
        })

        // it('Solicitar Recuperación', async () => {
        //   mockingoose(model).toReturn(resVerificarLogin, 'findOneAndUpdate')
        //   const { res } = await expressRequestMock(controlador.solicitarRecuperacion, reqVerificarLogin, helper.resp)
        //   const { token, datos } = JSON.parse(res._getData());
        //   expect(res.statusCode).toEqual(200);
        //   expect(datos.codigo).toBeLessThan(0);
        //   expect(datos.exito).toBeTruthy();   
        // })

        it('Recuperar Contraseña', async () => {
          mockingoose(model).toReturn(resVerificarLogin, 'findOneAndUpdate')
            const { res } = await expressRequestMock(controlador.recuperarcontrasena, reqVerificarLogin, helper.resp)
            const { token, datos } = JSON.parse(res._getData());
            expect(res.statusCode).toEqual(200);
            expect(datos.codigo).toBeLessThan(0);
            expect(datos.exito).toBeTruthy();   
        });

        it('Cambiar Contraseña Distinta', async () => {
            mockingoose(model).toReturn(resVerificarLogin, 'findOne')
            mockingoose(model).toReturn(resVerificarLogin, 'findOneAndUpdate')
            const { res } = await expressRequestMock(controlador.cambiarContrasena, reqPasswordDistinta, helper.resp)
            const { token, datos } = JSON.parse(res._getData());
            expect(res.statusCode).toEqual(200);
            expect(datos.codigo).toBeGreaterThan(0);
            expect(datos.exito).toBeFalsy();   
        })

        it('Cambiar Contraseña', async () => {
          mockingoose(model).toReturn(resVerificarLogin, 'findOne')
          mockingoose(model).toReturn(resVerificarLogin, 'findOneAndUpdate')
          const { res } = await expressRequestMock(controlador.cambiarContrasena, reqPasswordIgual, helper.resp)
          const { token, datos } = JSON.parse(res._getData());
          expect(res.statusCode).toEqual(200);
          expect(datos.codigo).toBeLessThan(0);
          expect(datos.exito).toBeTruthy();   
      })

      it('Listar Todos Usuarios', async () => {
        mockingoose(model).toReturn([body], 'find')
        const { res } = await expressRequestMock(controlador.listaTodosUsuarios, reqGeneralUsuario, helper.resp)
        const { token, datos } = JSON.parse(res._getData());
        expect(res.statusCode).toEqual(200);
        expect(datos.codigo).toBeLessThan(0);
        expect(datos.exito).toBeTruthy();   
    })

    it('leer usuario', async () => {
      mockingoose(model).toReturn(body, 'findOne')
      const { res } = await expressRequestMock(controlador.leerUsuario, reqGeneralUsuario, helper.resp)
      const { token, datos } = JSON.parse(res._getData());
      expect(res.statusCode).toEqual(200);
      expect(datos.codigo).toBeLessThan(0);
      expect(datos.exito).toBeTruthy();   
  })

  it('modificar usuario', async () => {
    mockingoose(model).toReturn(body, 'findOneAndUpdate')
    const { res } = await expressRequestMock(controlador.modificarUsuario, reqPasswordIgual, helper.resp)
    const { token, datos } = JSON.parse(res._getData());
    expect(res.statusCode).toEqual(200);
    expect(datos.codigo).toBeLessThan(0);
    expect(datos.exito).toBeTruthy();   
})

it('borrarUsuario usuario', async () => {
  mockingoose(model).toReturn(body, 'findOneAndRemove')
  const { res } = await expressRequestMock(controlador.borrarUsuario, reqGeneralUsuario, helper.resp)
  const { token, datos } = JSON.parse(res._getData());
  expect(res.statusCode).toEqual(200);
  expect(datos.codigo).toBeLessThan(0);
  expect(datos.exito).toBeTruthy();   
})

})