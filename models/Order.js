//Collection Structure
const { SchemaTypes } = require('mongoose');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    'user_id': {
        type: SchemaTypes.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    'items': {
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
            }
        }],
        default: [],
        required: true,
        _id: false,
    },
    'total_price': {
        type: Number,
        min: 0,
        required: true,
    },
    'table_no': {
        type: String,
        trim: true,
        required: true,
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;