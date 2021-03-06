const Product = require("./Product");

module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define("Purchase", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "purchases",
        timestamps: false
    });

    Purchase.associate = (models) => {
        Purchase.belongsTo(models.Order, {
            as: "orderPurchases",
            foreignKey: "order_id"
        });
        Purchase.belongsTo(models.Product, {
            as: "productPurchases",
            foreignKey: "product_id"
        });
    }

    return Purchase;
}