module.exports = function(sequelize, DataTypes) {
    const Goal = sequelize.define("goal", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        description: DataTypes.TEXT,
        user_id: DataTypes.INTEGER
    });

    Goal.associate = function(models) {
        Goal.belongsTo(models.User, { // insert userId into Goal table
            onDelete: "cascade"
        });
        Goal.hasMany(models.Milestone, { // place goalId into Milestone table
            onDelete: "cascade"
        });
    };


    return Goal;
};
