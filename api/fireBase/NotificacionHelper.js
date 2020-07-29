const fireBase = require("../fireBase/FireBaseRecurso"),
funcionesGenerales = require("../FuncionesGlobales");




exports.ingresoAtleta = async function (Model, atleta){
    var atletaC = await Model.populate(atleta, 
       [{path: "competencia", 
           select: "_id fechaHora", 
                   populate:[{path: "prueba", select: "_id nombre"},
                             {path: "evento", select: "_id nombre"}
                   ]
       },
       {path: "atleta", select: "_id nombre"}
   ])
   var datos = {
       competencia: atletaC.competencia._id.toString(),
       prueba: atletaC.competencia.prueba._id.toString(),
       evento: atletaC.competencia.evento._id.toString()
   }
   fireBase.enviarNotificacionesAtleta("Atleta " + atletaC.atleta.nombre +
   " participará en competencia de " + atletaC.competencia.prueba.nombre +
   " " + atletaC.competencia.evento.nombre + " el " +
    funcionesGenerales.construirFecha(atletaC.competencia.fechaHora, true),
   atletaC.atleta._id, datos
    );

}


exports.ingresoEquipo = async function (Model, equipo){
    var equipoC = await Model.populate(equipo, 
       [{path: "competencia", 
           select: "_id fechaHora", 
                   populate:[{path: "prueba", select: "_id nombre"},
                             {path: "evento", select: "_id nombre"}
                   ]
       },
       {path: "equipo", select: "_id nombre"}
   ])
   fireBase.enviarNotificacionesAtleta("Atleta " + equipoC.equipo.nombre +
   " participará en competencia de" + equipoC.competencia.prueba.nombre +
   " " + atletaC.competencia.evento.nombre + " el " 
   + funcionesGenerales.construirFecha(equipoC.competencia.fechaHora, true),
   equipoC.equipo._id
    );
}

exports.cambioEnCompetencia = async function(Model){

}