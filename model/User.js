const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isTwitter: {
        type: Boolean,
        default: false
    },
    twitterExternalId: {
        type: String,
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User