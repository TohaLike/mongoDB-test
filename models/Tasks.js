const {Schema, model} = require('mongoose');

const tasksSchema = new Schema({
    complited: {
        type: Boolean,
        default: false
    },
    
    edit: {
        type: Boolean,
        default: false
    },

    employeeId: {
        type: Number,
        required: true,
        maxLength: 20, 
        minLength: 1,
        trim: true
    },

    tasksId: {
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

    email: {
        type: String,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    },

    taskEmployee: {
        type: String,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    }

})


module.exports = model('Tasks', tasksSchema)