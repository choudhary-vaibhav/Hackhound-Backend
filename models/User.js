//Collection Structure
const { SchemaTypes } = require('mongoose');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    'name': {
        type: SchemaTypes.String,
        trim: true,
        required: [true, "name not provided "],
    },
    'email': {
        type: SchemaTypes.String,
        required: [true, "email not provided "],
        unique: [true, "email already exists "],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email! '
          }
    },
    'password': {
        type: SchemaTypes.String,
        trim: true,
        required: true,
    },
    'contact': {
        type: SchemaTypes.String,
        trim: true,
    },
    'orders': [{
        type: SchemaTypes.ObjectId,
    }],
    'cart': {
        type: [{
            'name': {
                type: String,
                trim: true,
                required: true,
            },
            'price': {
                type: Number,
                min: 0,
                required: true,
            },
            'quantity': {
                type: Number,
                min: 0,
                required: true,
            },
            'img': {
                type: String,
               
            }
        }],
        default: [],
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = {
    User,
}