module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.CHAR(60),
        email: DataTypes.STRING
    });

    User.hasMany(models.Goal); //will add userId to Goals
    
    User.belongsTo(models.Calendar); //will create calendarId in User table
    
    return User;
};
