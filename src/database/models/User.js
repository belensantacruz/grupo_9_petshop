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