module.exports = function(sequelize, DataTypes) {
    const Goal = sequelize.define("goal", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        description: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN,
        user_id: DataTypes.INTEGER
    });

    Goal.associate = function(models) {
        Goal.belongsTo(models.User);
        Goal.hasMany(models.Milestone);
    };


    return Goal;
};
