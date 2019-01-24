let AppConfig = require('../config/config');
let User = require('../models/user.model');
let Role = require('../models/role.model');

let schema = AppConfig.getDB();

let Rights = schema.db.define('rights', {
    userId: {
        type: schema.Sequelize.BIGINT,
        field: 'userId',
        references: {
            // This is a reference to another model
            model: User,

            // This is the column name of the referenced model
            key: 'id',

            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: AppConfig.Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    roleId: {
        type: schema.Sequelize.BIGINT,
        field: 'roleId',
        references: {
            // This is a reference to another model
            model: Role,

            // This is the column name of the referenced model
            key: 'id',

            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: AppConfig.Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

User.belongsToMany(Role, { through: 'rights', foreignKey: 'userId' });
Role.belongsToMany(User, { through: 'rights', foreignKey: 'roleId' });

// User.sync({ force: true })
//     .then(righ => {
//         console.log('Successfully dropped Users table');
//         Role.sync({ force: true })
//             .then(us => {
//                 console.log('Successfully dropped Role table');
//                 Rights.sync({ force: true })
//                     .then(rol => {
//                         console.log('Successfully dropped Rights table');
//                     })
//                     .catch(err => {
//                         console.log('Throws error when dropping Rights table');
//                         console.log(err);
//                     });
//             }).catch(err => {
//                 console.log('Throws error when dropping Role table');
//                 console.log(err);
//             });
//     })
//     .catch(err => {
//         console.log('Throws error when dropping User table');
//         console.log(err);
//     });
// ;




module.exports = Role;