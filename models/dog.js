module.exports = function (sequelize, DataTypes) {
    const Dog = sequelize.define("Dog", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        dog_name: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        breed: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    });

    Dog.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Dog.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Dog;
};