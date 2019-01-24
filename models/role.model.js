let AppConfig=require('../config/config');

let schema= AppConfig.getDB();

let Role=schema.db.define('roles',{
    id:{
        type:schema.Sequelize.BIGINT,
        field:'id',
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:schema.Sequelize.BIGINT,
        field:'name',
        unique:true
    },
    isActive:{
        type:schema.Sequelize.BOOLEAN,
        field:'isActive',
        defaultValue:true
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

module.exports=Role;