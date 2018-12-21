module.exports = function (sequelize, DataTypes) {
    const Posts = sequelize.define("Posts", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        text: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        breed: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        post_type: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    });

    // Posts.associate = function (models) {
    //     Posts.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Posts;
};
