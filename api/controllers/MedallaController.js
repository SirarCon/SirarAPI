
Medalla.find().exec().then(madallas => {
    if(medallas.length > 0){
    }else{
  
    }
  }).catch(err=> {
    
  });
  
  
  Medalla.find().where({ atletaCompetidor: req.params.idAtletaCompetidor }).exec().then(madallas => {
    if(medallas.length > 0){
    }else{
  
    }
  }).catch(err=> {
    
  });
  
  
  Medalla.find().where({ equipoCompetidor: req.params.idAtleta }).exec().then(madallas => {
    if(medallas.length > 0){
    }else{
  
    }
  }).catch(err=> {
    
  })
  
  Medalla.aggregate(
  {
              $lookup: {
              "localField": "atletaCompetidor",
              "from": "atletacompetidors",
              "foreignField": "_id",
              "as": "atletas"
              }
  },
  {
  $unwind: "atletas"
  },
  {
    $match: {
          "$atletas.atleta" : Number(req.params.idAtleta)
    }
  },
  {
    $project: {
          _id: {
                atletas: 0, 
          }
    }
  }
  
  );