const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String,
      required: false
    },
    link: {
      type: String
    }
  },
  { timestamps: true }
)

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
