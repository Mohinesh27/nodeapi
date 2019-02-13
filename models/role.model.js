
var mongoose = require('mongoose');

//setup schema
var RoleSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    modifiedBy:{
        type:mongoose.Schema.Types.ObjectId,
    },
    createdon:{
        type:Date,
        default:Date.now
    },
    modifiedon:{
        type:Date
    },
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
    
});

// Export Contact model
var Role = module.exports = mongoose.model('Role', RoleSchema);

module.exports.get = function (callback, limit) {
    Role.find(callback).limit(limit);
}