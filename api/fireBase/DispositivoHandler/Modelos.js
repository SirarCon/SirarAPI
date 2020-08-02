exports.getDispositivoAtleta = function(body)
{
  let conToken =
    { 
      token: body.token,
      atleta: body.atleta 
    }
  return conToken;
}

exports.getDispositivoSinTokenAtleta = function(body)
{
  let sinToken = 
    {
      atleta: body.atleta 
    }
  return sinToken;
}

exports.getDispositivoEquipo = function(body)
{
  let conToken =
    { 
      token: body.token,
      equipo: body.equipo 
    }
  return conToken;
}

exports.getDispositivoSinTokenEquipo = function(body)
{
  let sinToken = 
    {
      equipo: body.equipo 
    }
  return sinToken;

}

exports.getDispositivoCompetencia = function(body)
{
  let conToken =
    { 
      token: body.token,
      competencia: body.competencia 
    }
  return conToken;
}

exports.getDispositivoSinTokenCompetencia = function(body)
{
  let sinToken = 
    {
      competencia: body.competencia 
    }
  return sinToken;
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
