'use strict'

const mongoose = require('mongoose')

const quantumSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    max: [180, '({VALUE}) exceeds the maximum ({MAX}).'],
    min: [-180, '({VALUE}) is below the minimum ({MIN}).']
  },
  latitude: {
    type: Number,
    max: [90, '({VALUE}) exceeds the maximum ({MAX}).'],
    min: [-90, '({VALUE}) is below the minimum ({MIN}).']
  },
  _counter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _research: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Research',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._counter)
      return ret
    }
  }
})

// quantumSchema.virtual('length').get(function length () {
//   return this.text.length
// })

const Quantum = mongoose.model('Quantum', quantumSchema)

module.exports = Quantum
