module.exports = function(sequelize, DataTypes){
  var Users = sequelize.define("Users", {
    username: {type: DataTypes.STRING, allowNull: false, unique: true}
  });
  Users.associate = function(models) {
    Users.hasMany(models.Messages, {foreignKey: 'author_id'});
    Users.hasMany(models.Topics, {foreignKey: 'created_by'});
  };

  return Users;
};