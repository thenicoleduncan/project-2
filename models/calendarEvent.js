module.exports = function(sequelize, DataTypes) {
    const CalendarEvent = sequelize.define("calendar_event", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }, 
        description: DataTypes.TEXT,
        start_date: DataTypes.DATE,
        due_date: DataTypes.DATE
    });

    CalendarEvent.associate = function(models) {
        CalendarEvent.belongsTo(models.Calendar, {
            onDelete: "cascade"
        });
        
    };

    return CalendarEvent;
};
