let AppConfig=require('../config/config');

let schema= AppConfig.getDB();

let User=schema.db.define('users',{
    id:{
        type:schema.Sequelize.BIGINT,
        field:'id',
        primaryKey:true,
        autoIncrement:true
    },
    userName:{
        type:schema.Sequelize.STRING,
        field:'userName',
        unique:true
    },
    firstName:{
        type:schema.Sequelize.STRING,
        field:'firstName',
        allowNull:false
    },
    lastName:{
        type:schema.Sequelize.STRING,
        field:'lastName',
        allowNull:false
    },
    email:{
        type:schema.Sequelize.STRING,
        field:'email',
        unique:true,
        validate:{
            isEmail:true
        }
    },
    mobile:{
        type:schema.Sequelize.STRING,
        field:'mobile',
        unique:true,
        validate:{
            len:[10],
            isNumeric:true
        }
    },
    isActive:{
        type:schema.Sequelize.BOOLEAN,
        field:'isActive',
        defaultValue:true
    },
    password:{
        type:schema.Sequelize.STRING,
        field:'password'
    },
    createdBy:{
        type:schema.Sequelize.BIGINT,
        field:'createdBy'
    },
    modifiedBy:{
        type:schema.Sequelize.BIGINT,
        field:'modifiedBy'
    }
    
});



module.exports=User;