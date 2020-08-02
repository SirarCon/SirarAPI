exports.getDispositivoAtleta = function(body)
{
  let conToken =
  { 
    token: body.token,
    atleta: body.atleta 
  }
  let sinToken ={
    atleta: body.atleta 
  }
  return body.token ? conToken : sinToken;
}

exports.getDispositivoEquipo = function(body)
{
  let conToken =
  { 
    token: body.token,
    atleta: body.equipo 
  }
  let sinToken ={
    atleta: body.equipo 
  }
  return body.token ? conToken : sinToken;

}

exports.getDispositivoCompetencia = function(body)
{
  let conToken =
  { 
    token: body.token,
    atleta: body.competencia 
  }
  let sinToken ={
    atleta: body.competencia 
  }
  return body.token ? conToken : sinToken;
}

exports.getAtleta = function(atleta)
{
  return { 
      atleta: atleta
    }
}

exports.getEquipo = function(equipo)
{
  return { 
      equipo: equipo
    }
}

exports.getCompetencia = function(competencia)
{
  return { 
      competencia: competencia
    }
}
