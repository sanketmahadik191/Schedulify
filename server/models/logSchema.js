const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
        required:true,
    },

    timeStamp:{
        type:Date,
        default:Date.now,
    },

    status:{
        type:String,
        enum:['success','error'],
        required:true,
    },
    message:{
        type:String,
    }
});

module.exports = mongoose.model('Log',logSchema);