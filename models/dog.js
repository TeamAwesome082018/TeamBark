module.exports = function (sequelize, DataTypes) {
    const Dog = sequelize.define("dog", {
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

    // Dog.associate = function (models) {
    //     Dog.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Dog;
};
