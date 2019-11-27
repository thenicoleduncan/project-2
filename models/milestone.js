module.exports = function(sequelize, DataTypes) {
    const Milestone = sequelize.define("milestone", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        description: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN
    });

    Milestone.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Milestone.hasMany(models.Task);
        Milestone.belongsTo(models.Goal);
    };


    return Milestone;
};
