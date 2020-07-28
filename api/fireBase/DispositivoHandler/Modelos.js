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

exports.getAtleta = function(body)
{
  return { 
      atleta: body.atleta
    }
}

exports.getEquipo = function(body)
{
  return { 
      equipo: body.equipo
    }
}

exports.getCompetencia = function(body)
{
  return { 
      competencia: body.competencia
    }
}
