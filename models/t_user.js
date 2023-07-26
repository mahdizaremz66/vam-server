const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const t_user = sequelize.define('t_user', {
  user_name_usr: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true
  },
  pass_word_usr: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  name_usr: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  mobile_usr: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  level_usr: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  access_usr: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  top_user_usr: {
    type: DataTypes.STRING(20),
    allowNull: true,
    references: {
      model: 't_user',
      key: 'user_name_usr'
    }
  },
  token_usr: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  token_expr_usr: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 't_user',
  timestamps: false
});

// t_user.beforeCreate(async (user) => {
//   const hashedPassword = await bcrypt.hash(user.pass_word_usr, 10);
//   user.pass_word_usr = hashedPassword;
// });

t_user.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.pass_word_usr);
};

t_user.prototype.generateToken = function () {
  const token = jwt.sign({ user_name_usr: this.user_name_usr }, 'secret_key', { expiresIn: '3h' });
  this.token_usr = token;
  this.token_expr_usr = new Date(Date.now() + 3 * 60 * 60 * 1000); // Set token expiration time to 3 hours from now
  return token;
};

module.exports = t_user;
