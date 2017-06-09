'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Research = models.research
const Quantum = models.quantum

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Research.find()
    .then(researches => res.json({
      researches: researches.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res, next) => {
// get the sum of all quantum.count for a research
  Quantum.aggregate(
    [
      { $match: { _research: req.research._id }
      },
      {
        $group:
        {
          _id: '$_research',
          totalCount: { $sum: '$count' }
        }
      }
    ]
  )
.then(researchTtlCnt => {
  // pass sum as a virtual
  req.research.total = researchTtlCnt[0].totalCount
  res.json({
    research: req.research.toJSON({ virtuals: true, user: req.user, research: req.research })
  })
})
.catch(next)
}

const create = (req, res, next) => {
  const research = Object.assign(req.body.research, {
    _owner: req.user._id
  })
  Research.create(research)
    .then(research =>
      res.status(201)
        .json({
          research: research.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.research.update(req.body.research)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.research.remove()
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
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Research), only: ['show'] },
  { method: setModel(Research, { forUser: true }), only: ['update', 'destroy'] }
] })
