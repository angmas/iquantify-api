'use strict'

const mongoose = require('mongoose')

const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 144
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  directions: {
    type: String,
    required: true
  },
  announcement: {
    message: {
      type: String,
      maxlength: 255
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  hide: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

researchSchema.virtual('length').get(function length () {
  return this.title.length
})

const Research = mongoose.model('Research', researchSchema)

module.exports = Research
