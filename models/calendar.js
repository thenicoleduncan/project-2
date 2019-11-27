module.exports = function(sequelize, DataTypes) {
    const Calendar = sequelize.define("calendar", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }, 
        description: DataTypes.TEXT,
        start_date: DataTypes.DATE,
        due_date: DataTypes.DATE
    });

    Calendar.associate = function(models) {
        Calendar.belongsTo(models.User, {
            onDelete: "cascade"
        });
        
        Calendar.hasMany(models.CalendarEvent, {
            onDelete: "cascade"
        });
    };

    return Calendar;
};
