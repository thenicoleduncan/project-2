module.exports = function(sequelize, DataTypes) {
    const Task = sequelize.define("task", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }, 
        description: DataTypes.TEXT,
        start_date: DataTypes.DATE,
        due_date: DataTypes.DATE
    });

    Task.associate = function(models) {
        // this will make it so that an extra parameter, MilestoneId will be 
        //added as a foreign key 
        Task.belongsTo(models.Milestone, {
            onDelete: "cascade"
        });
    };

    return Task;
};
