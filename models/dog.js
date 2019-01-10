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
        },
        gender: {
            type: DataTypes.STRING,
        },
        lost: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
            defaultValue: false
        },
        dog_note: {
            type: DataTypes.TEXT,
        },
        photo_url: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        //This is needed if case the user wants to change or delete their image from cloudinary
        cloudinary_public_id: {
            type: DataTypes.STRING
        }
    });

    Dog.associate = function (models) {
        // We're saying that a Dog should belong to a user
        // A dog can't be created without an user due to the foreign key constraint
        Dog.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Dog;
};