module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "categories",
        timestamps: false
    });

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        });
    }
    
    return Category;
}