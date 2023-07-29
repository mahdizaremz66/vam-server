const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

  const t_organ = sequelize.define('t_organ', {
    code_organ_org: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_organ_org: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mosavab_org: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 't_organ',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_organ_org" },
        ]
      },
    ]
  });

  module.exports =t_organ;