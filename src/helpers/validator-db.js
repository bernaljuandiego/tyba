const passwordValido = (password='')=>{

    const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+_{}():;.,/-])([A-Za-z\d$@$!%*?&+_{}():;.,/-]|[^ ]){8,}$/;
    if(password &&  !password.match(expPassword)){
 
         throw new Error('La contraseña debe tener al menos 8 caracteres, con al menos una letra mayúscula, una minúscula,un número y un carácter especial.');
 
     }
 
     return true;  
  
}

module.exports = {

    passwordValido,
    
 }
 