const express = require('express')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const router = express.Router()
const Resource = require('../models/Resource')
const User = require('../models/User')

// Resource Homepage
router.get('/', (req, res) => {
  Resource.find({}, (err, allResources) => {
    if (err) return console.log(err)

    console.log(allResources)

    res.render('resources/index', {
      resource: allResources
    })
  })
})

// New Resource Route
router.get('/new', (req, res) => {
  User.find({}, (err, user) => {
    if (err) return console.log(err)
    res.render('resources/new', { user })
  })
})

// Show Resource
router.get('/:id', (req, res) => {
  User.findOne({ resources: req.params.id })
    .populate({
      path: 'resources',
      match: { _id: req.params.id }
    })
    .exec((err, showResource) => {
      console.log(showResource)
      res.render('resources/show', {
        resource: showResource.resources[0],
        user: showResource
      })
    })
})

// Create Resource
router.post('/', (req, res) => {
  Resource.create(req.body, (err, newResource) => {
    if (err) return console.log(err)
    console.log(newResource)
    User.findById(req.body.userID, (err, user) => {
      user.resources.push(newResource)
      user.save((err, userSaved) => {
        console.log(userSaved)

        res.redirect('resources')
      })
    })
  })
})

// Edit Resource
router.get('/:id/edit', (req, res) => {
  Resource.findById(req.params.id, (err, edit) => {
    if (err) return console.log(err)

    res.render('resources/edit', {
      //referring view
      resource: edit
    })
  })
})

// Update Resource
router.put('/:id', (req, res) => {
  Resource.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateResource) => {
      if (err) return console.log(err)

      res.redirect('/resources') //reloading the page
    }
  )
})

// Delete Resource
router.delete('/:id', (req, res) => {
  Resource.findByIdAndDelete(req.params.id, (err, deleteResource) => {
    if (err) return console.log(err)

    res.redirect('/resources')
  })
})

module.exports = router
