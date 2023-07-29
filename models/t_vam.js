const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const t_vam= sequelize.define('t_vam', {
    id_letter_vam: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    date_letter_vam: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    index_letter_vam: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code_meli_vam: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    name_vam: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    family_vam: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    mobil_vam: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    code_organ_vam: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title_vam: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    mblg_vam: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    time_vam: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    validat_vam: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    mblg_inf_vam: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    time_inf_vam: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attach_file_vam: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    date_last_vaz_vam: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    time_last_vaz_vam: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    last_vaz_vam: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    descp_last_vaz_vam: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_vam',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_letter_vam" },
          { name: "date_letter_vam" },
          { name: "code_meli_vam" },
        ]
      },
    ]
  });

  module.exports=t_vam;
