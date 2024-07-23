exports.setErrors = (error, type="default") => {
  let errors = [];

  if(error.name === "SequelizeUniqueConstraintError") {
    for(let e of error.errors) {
      errors.push( {msg: e.message } )
    }
    return errors
  }

  if(error.name === "SequelizeValidationError") {
    for(let e of error.errors) {
        errors.push( { msg: e.message } )
    }
    return errors
  }

  if(error.name === "SequelizeForeignKeyConstraintError") {
      errors.push( {msg: error.fields[0] + " es requerido." } )
      return errors
  }

  if(error === 'jwt expired') {
    errors.push( { msg: "Token expirado." })
    return errors
  }

  if(error === 'No auth token') {
    errors.push({ msg: "No existe un token." })
    return errors
  }

  if(error === 'jwt malformed') {
    errors.push({ msg: "Token invalido." })
    return errors
  }

  if(error === 'Missing credentials') {
    errors.push({ msg: "Usuario o Contraseña invalidos." })
    return errors
  }
  if(error === 'Old password is not correct') {
    errors.push({ msg: "La contraseña anterior no coincide." })
    return errors
  }
  if(error === 'Cuenta no registrada') {
    errors.push({ msg: "Cuenta no registrada." })
    return errors
  }
  if(error.message){

    errors.push({msg: error.message})
    return errors;
  }



   errors.push({msg: error})
   return errors;
}
