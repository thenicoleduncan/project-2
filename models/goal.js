module.exports = function(sequelize, DataTypes) {
    const Goal = sequelize.define("Goal", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true
        },
        description: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN
    });

    Goal.associate = function(models) {
        Goal.belongsTo(models.User);
        Goal.hasMany(models.Milestone);
    };


    return Goal;
};
