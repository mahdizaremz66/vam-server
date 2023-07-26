const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const moment = require('moment-jalaali');

const t_user_log = sequelize.define('t_user_log', {
    user_name_log: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 't_user',
        key: 'user_name_usr'
      }
    },
    index_log: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_log: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: moment().format('jYYYY/jMM/jDD')
    },
    time_log: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: moment().format('HH:mm:ss')
    },
    descp_log: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_user_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_name_log" },
          { name: "index_log" },
        ]
      },
    ]
  });

  module.exports = t_user_log;