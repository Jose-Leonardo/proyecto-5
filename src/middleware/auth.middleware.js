const { ExtractJwt, Strategy } = require('passport-jwt')
const passport = require('passport')
const {findUserById} = require('../users/users.controllers')
const passportConfigs = {
    //extrae el token de header, solo si empiesa con...
    //Bearer ----> Aothorization____ Bearer
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: 'academlo'
}

passport.use(
    new Strategy(passportConfigs, (tokenDecoded, done) => {
        findUserById(tokenDecoded.id)//crea una validacion
            .then(user => {
                if(user){
                    done(null, tokenDecoded) //? Caso Exitoso, porque el usuario si existe
                } else {
                    done(null, false, {message: 'Token incorrect'}) //? Caso fallido, en el que no genera error, pero no existe el usuario
                }
            })
            .catch(err => {
                done(err, false) //? Caso fallido, en el que si genera un error
            })
    })
)


module.exports = passport