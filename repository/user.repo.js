let User = require('../models/user.model');
var generator = require('generate-password');
const bcrypt = require('bcrypt');
let CONFIG = require('config');


generatePassword = () => {
    var temp = generator.generate({
        length: 6,
        numbers: true
    });
    console.log(temp);
    return bcrypt.hashSync(temp, CONFIG.get('encryption.saltrounds'));

}

exports.new = (req, res) => {
    var obj = req.body;
    var pass = generatePassword();
    console.log(pass);
    if (obj == null) {
        return false;
    }
    else {
        var newUser = new User();
        newUser.email = obj.email;
        newUser.firstName = obj.firstName;
        newUser.lastName = obj.lastName;
        newUser.mobile = obj.mobile;
        newUser.password = pass;
        newUser.userName = obj.userName;
        newUser.createdBy=obj.createdBy;

        newUser.save((err) => {
            if (err) {
                res.json({
                    status: 'error',
                    message: err
                });
            }
            res.json({
                status: 'success',
                message: 'New User created!',
                data: newUser
            });
        });
    }
    
}

exports.get = (req, res) => {
    User.get((err,users)=>{
        if(err){
            res.json({
                status:'error',
                message:err
            });
        }
        res.json({
            status:'success',
            message:'Users retrieved successfully',
            data:users
        });
    });
}

exports.view = (req, res) => {
    User.findById(req.params.id,(err,user)=>{
        if(err){
            res.json({
                status:'error',
                message:err
            });
        }
        res.json({
            status:'success',
            message:'Users details loading...',
            data:user
        });
    })
}

exports.delete = (req, res) => {
    User.remove({
        id:req.params.id
    },(err,user)=>{
        if(err){
            res.json({
                status:'error',
                message:e
            });
        }

        res.json({
            status:'success',
            message:'User deleted successfully.'
        });
    })
}

exports.update = (req, res) => {
    User.findById(req.params.id,(err,user)=>{
        if(err)
        {
            res.json({
                status:'error',
                message:err
            });
        }

        user.userName=req.body.userName;
        user.email=req.body.email;
        user.modifiedby=req.body.modifiedby;
        user.firstName=req.body.firstName;
        user.lastName=req.body.lastName;
        user.isActive=req.body.isActive;
        user.mobile=req.body.mobile;
        user.modifiedon=new Date();

        user.save((err)=>{
            if(err){
                res.json({
                    status:'error',
                    message:err
                });
            }
            res.json({
                status:'success',
                message:'User info updated',
                data:user
            });
        });
    });
}

exports.login = (req, res) => {

    var obj = req.body;
    
        User.findOne({
            userName:obj.userName,
            password:obj.password
        }).then((u) => {
            console.log(u);

            checkUser(obj, u).then((ismatch) => {
                res.json({
                    status:'success',
                    message:'User logged in successfully',
                    data:u
                });
            }).catch((e) => {
                res.json({
                    status:'error',
                    message:e
                });
            });

            // else {
            //     return { 'message': 'UserName or Password incorrect.' };
            // }
        }).catch((err) => {
            console.log('Error in findOne-' + err);
            res.json({
                status:'error',
                message:e
            });
        });

}

exports.checkUser = (obj, user) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(obj.password, user.password).then((res) => {

            resolve(res);

        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}


