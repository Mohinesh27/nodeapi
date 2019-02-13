
var mongoose = require('mongoose');

//setup schema
var UserSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique: true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:true,
        validate:{
            validator:function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not valid email!`
        }
    },
    mobile:{
        type:String,
        unique:true,
        required:true,
        validate: {
            validator: function(v) {
              return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          }
    },
    isActive:{
        type:Boolean,
        field:'isActive',
        defaultValue:true
    },
    password:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    modifiedBy:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdon:{
        type:Date,
        default:Date.now
    },
    modifiedon:{
        type:Date
    },
    roles:[{type:mongoose.Schema.Types.ObjectId,ref:'Role'}]

});

// Export Contact model
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}