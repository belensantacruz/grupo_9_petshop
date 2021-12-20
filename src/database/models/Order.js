module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2)
        }
    }, {
        tableName: "orders",
        timestamps: false
    });

    Order.associate = (models) => {
        Order.hasMany(models.Purchase, {
            as: "purchasesOrder",
            foreignKey: "order_id"
        });
        Order.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        });
    }

    return Order;
}