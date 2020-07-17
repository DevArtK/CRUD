const mongoose = require('mongoose')
const Resource = require('./Resource')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 12
  },
  location: {
    type: String
  },
  email: {
    type: String
  },
  profession: {
    type: String
  },
  interests: {
    type: String
  },
  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource' //this references the model
    }
  ],
  photo: [
    {
      img: ''
    }
  ]
})

const User = mongoose.model('User', UserSchema)

module.exports = User
