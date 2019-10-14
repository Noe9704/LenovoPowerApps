const express = require('express')
require('./db/mongoose')

const Order = require('./models/order')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/datas', function(req, res) {
  const data = new Order(req.body)
  data.save().then(function() {
      return res.send(data)
  }).catch(function(error) {
      return res.status(400).send(error)
  })
})

app.get('/datas', function(req, res) {
  Order.find({}).then(function(datas) {
    res.send(datas)
  }).catch(function(error) {
    res.status(500).send(error)
  })
})

app.get('/datas/:id', function(req, res) {
  const _id = req.params.id
  Order.findById(_id).then(function(data) {
    if(!data){
      return res.status(404).send()
    }
    return res.send(data)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.patch('/datas/:id', function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'father', 'mother']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidUpdate) {
    return res.status(400).send({
      error: 'Error, solo se puede actualizar: ' + allowedUpdates
    })
  }
  Order.findByIdAndUpdate(_id, req.body).then(function(data) {
    if(!data){
      return res.status(404).send()
    }
    return res.send(data)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.delete('/datas/:id', function(req, res) {
  const _id = req.params.id
  Order.findByIdAndDelete(_id, req.body).then(function(data) {
    if(!data) {
      return res.status(404).send()
    }
    return res.send(data)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.listen(port, function() {
    console.log('Up And Ready ' + port)
})