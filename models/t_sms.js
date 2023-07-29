const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const t_sms = sequelize.define('t_sms', {
  id_msg_sms: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true
  },
  id_letter_sms: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 't_vam',
      key: 'id_letter_vam'
    }
  },
  date_letter_sms: {
    type: DataTypes.STRING(10),
    allowNull: false,
    references: {
      model: 't_vam',
      key: 'date_letter_vam'
    }
  },
  code_meli_sms: {
    type: DataTypes.STRING(10),
    allowNull: false,
    references: {
      model: 't_vam',
      key: 'code_meli_vam'
    }
  },
  date_sms: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  time_sms: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  kind_sms: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  mobil_sms: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  text_sms: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  vaz_msg: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 't_sms',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id_msg_sms" },
      ]
    },
    {
      name: "r_sms_vam",
      using: "BTREE",
      fields: [
        { name: "id_letter_sms" },
        { name: "date_letter_sms" },
        { name: "code_meli_sms" },
      ]
    },
  ]
});

module.exports = t_sms;
