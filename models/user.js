
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.CHAR(60),
        email: DataTypes.STRING, 
        password: DataTypes.STRING
    });

    User.associate = function (models) {
        User.hasMany(models.Goal); //will add userId to Goals

        User.hasOne(models.Calendar); //will create calendarId in User table
    }
    return User;
};


