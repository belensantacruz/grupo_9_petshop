module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        image: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING(20)
        },
        stock: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "products",
        timestamps: false
    });

    Product.associate = (models) => {
        Product.hasMany(models.Purchase, {
            as: "purchasesProducts",
            foreignKey: "product_id"
        });
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "category_id"
        });
    }

    return Product;
}