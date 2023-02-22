const bcrypt = require('bcrypt')

//*Aqui se incripta / plainPassword es la contraseña en texto plano, lo tenemos en el login
const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
}

//*esta utilidad se usa cuando hacemos un login y recibimos la 
//*cpntraseña del usuario y la comparamos en el db
const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}
//*hashedPassword es la contraseña que tenemos en la base de datos 


module.exports = {
    hashPassword,
    comparePassword
}