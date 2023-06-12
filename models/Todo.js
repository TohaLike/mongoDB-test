const {Schema, model} = require('mongoose');

const schema = new Schema({
    complited: {
        type: Boolean,
        default: false
    },
    
    edit: {
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

    jobTitle: {
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
    },

    employeeId: {
        type: Number,
        required: true,
        maxLength: 20, 
        minLength: 1,
        trim: true
    },

    projectId: {
        type: Number,
        required: true,
        maxLength: 20, 
        minLength: 1,
        trim: true
    },

    taskId: {
        type: Number,
        required: true,
        maxLength: 20, 
        minLength: 1,
        trim: true
    }

});


module.exports = model('Todo', schema)