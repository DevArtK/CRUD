express = require('express')
const router = express.Router()

const { ensureAuth, ensureGuest } = require('../middleware/auth')
const User = require('../models/User')
const Resource = require('../models/Resource')
// const GUser = require('../models/GUser');

// User Network
router.get('/', (req, res) => {
  User.find({}, (err, allUsers) => {
    if (err) return console.log(err)

    console.log(allUsers)

    res.render('user/index', {
      user: allUsers
    })
  })
})

// Show Profile
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .populate({ path: 'resources' })
    .exec((err, showUser) => {
      if (err) return console.log(err)

      res.render('user/show', {
        user: showUser
      })
    })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, showUser) => {
    if (err) return console.log(err)

    res.render('user/show', {
      user: showUser
    })
  })
})

// Create User Profile
router.post('/', (req, res) => {
  User.create(req.body, (err, newUser) => {
    if (err) return console.log(err)
    console.log(newUser)

    res.redirect('network')
  })
})

module.exports = router
