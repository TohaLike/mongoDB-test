const {Schema, model} = require('mongoose');

const projectSchema = new Schema({
    complited: {
        type: Boolean,
        default: false
    },
    
    edit: {
        type: Boolean,
        default: false
    },

    nameOfProject: {
        type: String,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    },

    description: {
        type: String,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    },

    dataStarted: {
        type: String,
        required: true,
        maxLength: 20, 
        minLength: 1,
        trim: true
    },

    dataEndend: {
        type: String,
        required: true,
        maxLength: 20, 
        minLength: 1,
        trim: true
    },

    team: {
        type: Number,
        required: true,
        maxLength: 20, 
        minLength: 1,
        trim: true
    },

    client: {
        type: String,
        required: true,
        maxLength: 255, 
        minLength: 1,
        trim: true
    }, 

    projectId: {
        type: Number,
        required: true,
        maxLength: 20, 
        minLength: 1,
        trim: true
    }

})


module.exports = model('Projects', projectSchema)