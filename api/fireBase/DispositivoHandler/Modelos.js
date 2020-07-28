exports.getDispositivoAtleta = function(body)
{
  return { 
      token: body.token,
      atleta: body.atleta
    }
}

exports.getDispositivoEquipo = function(body)
{
  return { 
      token: body.token,
      equipo: body.equipo
    }
}

exports.getDispositivoCompetencia = function(body)
{
  return { 
      token: body.token,
      competencia: body.competencia
    }
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
