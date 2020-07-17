//=========== DB ===========
const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log(`MongoDb connected : ${conn.connect.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = {
  Resource: require('./Resource'),
  User: require('./User')
}

module.exports = connectDb
