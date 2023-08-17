var express = require('express')
const router = express.Router()

const UserRoute = require('./register.route')
router.use('/', UserRoute)

const TaskRoute = require('./new_task.route')
router.use('/home', TaskRoute)

const addSideRoute = require('./addSide.route')
router.use('/home', addSideRoute)

const manageRoute = require('./manage.route')
router.use('/home', manageRoute)

module.exports = router
