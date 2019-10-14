const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://Noe9704:Noe9704@cluster0-isozg.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
})