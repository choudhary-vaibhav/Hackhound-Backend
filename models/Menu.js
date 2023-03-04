//Collection Structure
const { SchemaTypes } = require('mongoose');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    'category': {
        type: SchemaTypes.String,
        trim: true,
        required: [true, "category not provided "],
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
            'image_url': {
                type: String,
                trim: true,
            }
        }],
        default: [],
        required: true,
    }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = {
    Menu
}