const {Schema, model} = require('mongoose');
const { title } = require('process');

const schema = new Schema({
    complited: {
        type: Boolean,
        default: false
    },
    
    firstName: {
        type: String,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    },

    email: {
        type: String,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    },

    mobilePhone: {
        type: Number,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    }

});


module.exports = model('Todo', schema)