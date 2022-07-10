
const {
  Model
} = require('sequelize');
const bcrypt=require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role,{
        foreignKey:"role_id"
      })
    }
  }
  User.init({
    role_id: DataTypes.INTEGER,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (user, options) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  User.prototype.comparePassword =  (passw, cb)=> {
    bcrypt.compare(passw, this.password,  (err, isMatch)=> {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };

  return User;
};