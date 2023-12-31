const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const t_vaz= sequelize.define('t_vaz', {
    code_vaz: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_vaz: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_vaz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_vaz" },
        ]
      },
    ]
  });

  module.exports=t_vaz;
  