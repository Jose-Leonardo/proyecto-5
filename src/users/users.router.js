const router = require('express').Router()

const userServices = require('./users.services')
const passwordJWT = require('../middleware/auth.middleware')

router.get('/', userServices.getAllUsers)
router.post('/', userServices.postNewUser)

router.get('/me', passwordJWT.authenticate('jwt', {session: false}), userServices.getMyUser )

router.get('/:id', userServices.getUserById)
router.patch('/:id', userServices.patchUser)
router.delete('/:id', userServices.deleteUser)

module.exports = router