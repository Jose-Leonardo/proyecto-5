const uuid = require('uuid')
const { findUserByEmail } = require('../users/users.controllers')
const {comparePassword} = require('../utils/crypto')

const checkUsersCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        console.log(email)
        const verifyPassword = comparePassword(password, user.password)
        console.log(password, user.password)
        console.log(verifyPassword)
        if (verifyPassword) {
            return user
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

module.exports = checkUsersCredentials