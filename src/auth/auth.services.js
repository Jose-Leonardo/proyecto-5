const jwt = require('jsonwebtoken')
const authControllers = require('./auth.controllers')
const response = require('../utils/responses.handler')

const postLogin = (req, res) => {
    const {email, password} = req.body
    authControllers(email, password)
        .then(data => {
            if (data) {
                const token = jwt.sign({
                    id: data.id,
                    email: data.email
                },'academlo')
                
                response.success({
                    res,
                    status: 200,
                    message: 'Correct Credentials',
                    data: token
                })
            } else {
                response.error({
                    res,
                    status: 401,
                    message: 'invalid Credentils'
                })
            }
        })
        .catch(err => {
            console.log(err)
            response.error({
                res,
                status: 400,
                message: 'Something bad es aqui'
            })
        })

}
const postRecoveryToken = (req, res) => {

    const { email } = req.body
    authControllers.createRecoveryToken(email)
        .then((data) => {
            if(data){
                mailer.sendMail({
                    from: '<test.academlo@gmail.com>',
                    to: email,
                    subject: 'Recuperación de Contraseña',
                    html: `<a href='${config.api.host}/api/v1/auth/recovery-password/${data.id}'>Recuperar contraseña</a>`
                })
            }
            res.status(200).json({message: 'Email sended!, Check your inbox'})
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}
module.exports = {
    postLogin,
    postRecoveryToken
}