exports.getDispositivoAtleta = function(body)
{
  let conToken =
    { 
      token: body.token,
      atleta: body.atleta 
    }
  let sinToken = 
    {
      atleta: body.atleta 
    }
  return body.token ? conToken : sinToken;
}

exports.getDispositivoEquipo = function(body)
{
  let conToken =
    { 
      token: body.token,
      equipo: body.equipo 
    }
  let sinToken = 
    {
      equipo: body.equipo 
    }
  return body.token ? conToken : sinToken;

}

exports.getDispositivoCompetencia = function(body)
{
  let conToken =
    { 
      token: body.token,
      competencia: body.competencia 
    }
  let sinToken = 
    {
      competencia: body.competencia 
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
