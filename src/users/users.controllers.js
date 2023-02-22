const uuid = require('uuid')
const {hashPassword} = require('../utils/crypto')
const Users = require('../models/users.models')

const findAllUser = async () => {
    const data = await Users.findAll()
    return data
}

const findUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id
        }
    })
    return data
}

const findUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email
        }
    })
    return data
}

const createNewUser = async (userObj) => {

    const data = await Users.create({
        id: uuid.v4(),
        firstName : userObj.firstName,
        lastName : userObj.lastName,
        email: userObj.email,
        password: hashPassword(userObj.password),
        profileImage: userObj.profileImage,
        phone : userObj.phone
    })
    return data
}

const updateUser = async (id, userObj) => {
    //data === 1
    const data = await Users.update(userObj,{
        where: {
            id
        }
    })
    return data[0]
}

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    findAllUser,
    findUserById,
    findUserByEmail,
    createNewUser,
    updateUser,
    deleteUser
}