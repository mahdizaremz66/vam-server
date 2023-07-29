const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const t_vam_vaz= sequelize.define('t_vam_vaz', {
    id_letter_vaz: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 't_vam',
        key: 'id_letter_vam'
      }
    },
    date_letter_vaz: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 't_vam',
        key: 'date_letter_vam'
      }
    },
    code_meli_vaz: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 't_vam',
        key: 'code_meli_vam'
      }
    },
    index_vaz: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_vaz: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    time_vaz: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    code_vaz_vaz: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 't_vaz',
        key: 'code_vaz'
      }
    },
    descp_vaz: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user_name_vaz: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 't_user',
        key: 'user_name_usr'
      }
    }
  }, {
    sequelize,
    tableName: 't_vam_vaz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_letter_vaz" },
          { name: "date_letter_vaz" },
          { name: "code_meli_vaz" },
          { name: "index_vaz" },
        ]
      },
      {
        name: "r_vam_vaz_user",
        using: "BTREE",
        fields: [
          { name: "user_name_vaz" },
        ]
      },
      {
        name: "r_vam_vaz_vaz",
        using: "BTREE",
        fields: [
          { name: "code_vaz_vaz" },
        ]
      },
    ]
  });

  module.exports=t_vam_vaz;
