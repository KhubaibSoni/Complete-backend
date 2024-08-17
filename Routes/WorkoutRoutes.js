const express = require('express')
const { GetAll,
  CreateNew,
  DeleteWorkout,
  Find , UpdateWorkout} = require('../Controllers/controllers')
const router = express.Router()

const requireAuth = require('../Middleware/AuthRequire')

// Routes



router.use(requireAuth)
router.get('/',GetAll)
router.get('/:id',Find)
router.post('/', CreateNew)
router.delete('/:id',DeleteWorkout)
router.patch('/:id', UpdateWorkout)



  



module.exports = router