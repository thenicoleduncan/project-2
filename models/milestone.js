module.exports = function(sequelize, DataTypes) {
    const Milestone = sequelize.define("milestone", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        description: DataTypes.TEXT,
        user_id: DataTypes.INTEGER
    });

    Milestone.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Milestone.hasMany(models.Task, {
            onDelete: "cascade"
        });
        Milestone.belongsTo(models.Goal, { //milestone has 1 goal id
            onDelete: "cascade"
        });
    };


    return Milestone;
};
