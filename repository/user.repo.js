let User=require('../models/user.model');
let Role=require('../models/role.model');
let Rights=require('../models/rights.model');
var generator = require('generate-password');
const bcrypt = require('bcrypt');
let CONFIG=require('config');
class UserRepository{
   
    constructor(){

    }

    generatePassword(){
        var temp=generator.generate({
            length:6,
            numbers:true
        });

        return bcrypt.hashSync(temp,CONFIG.get('encryption.saltrounds'));
        
    }
    create(obj){
        var newUser=null;
        var pass=this.generatePassword();
        if(obj==null)
        {
            return false;
        }
        else
        {
            newUser=User.build({
                email:obj.email,
                firstName:obj.firstName,
                id:0,
                lastName:obj.lastName,
                mobile:obj.mobile,
                password:pass
            }).save().then(saved=>{
                return saved;
            }).catch(err=>{
                console.log(err);
                return err;
            });
            
        }
        return newUser;
    }

    getAll(){
        return new User();
    }

    getById(id){
        // TODO
    }

    delete(id){

    }

    update(obj){

    }

}

module.exports= new UserRepository();