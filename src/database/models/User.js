module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING(20)
        },
        avatar: {
            type: DataTypes.STRING
        },
        isadmin: {
            type: DataTypes.TINYINT
        }
    }, {
        tableName: "users",
        timestamps: false
    });

    User.associate = (models) => {
        User.hasMany(models.Order, {
            as: "orders",
            foreignKey: "user_id"
        });
    }
    
    return User;
}

// const fs = require('fs');
// const path = require ('path')

// const BLA = {
//     fileName: path.resolve(__dirname, '../users.json'),

//     getData: function(){
//         return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
//     },

//     generateId: function() {
//         let allUsers = this.findAll();
//         let lastUser = allUsers.pop();
//         if (lastUser) {
//             return lastUser.id + 1;
//         }
//         return 1;
//     },

//     findAll: function(){
//         return this.getData();
//     },

//     findByPk: function(id){
//         let allUsers = this.findAll();
//         let userFound = allUsers.find(oneUser => oneUser.id === id);
//         return userFound;
//     },

//     findByField: function(field, text){
//         let allUsers = this.findAll();
//         let userFound = allUsers.find(oneUser => oneUser[field] === text);
//         return userFound;
//     },

//     create: function(userData) {
//         let allUsers = this.findAll();
//         let newUser = {
//             id: this.generateId(),
//             ...userData
//         }
//         allUsers.push(newUser);
//         fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
//         return newUser;
//     },

//     delete: function(id) {
//         let allUsers = this.findAll();
//         let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
//         fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
//         return true;
//     }

// }