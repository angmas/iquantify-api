'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Quantum = models.quantum

const authenticate = require('./concerns/authenticate')
// const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Quantum.find()
    .then(quantums => res.json({
      quantums: quantums.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    quantum: req.quantum.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const quantum = Object.assign(req.body.quantum, {
    _counter: req.user._id,
    _research: req.params.id
  })
  Quantum.create(quantum)
    .then(quantum =>
      res.status(201)
        .json({
          quantum: quantum.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.quantum.update(req.body.quantum)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.quantum.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
  // { method: setUser, only: ['index', 'show'] },
  { method: setModel(Quantum), only: ['show'] },
  { method: setModel(Quantum, { forUser: true }), only: ['update', 'destroy'] }
] })
