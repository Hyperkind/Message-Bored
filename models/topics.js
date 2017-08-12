
module.exports = function (sequelize, DataTypes){
  var Topics = sequelize.define("Topics", {
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
  }, {tableName: 'topics'});
  Topics.associate = function(models) {
    Topics.belongsTo(models.Users, {foreignKey: 'created_by'});
  };

  return Topics;
};

