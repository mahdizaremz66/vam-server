const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_sms_def', {
    code_org_def: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 't_organ',
        key: 'code_organ_org'
      }
    },
    code_vaz_def: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 't_vaz',
        key: 'code_vaz'
      }
    },
    text_sms_def: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_sms_def',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_org_def" },
          { name: "code_vaz_def" },
        ]
      },
      {
        name: "r_sms_def_vaz",
        using: "BTREE",
        fields: [
          { name: "code_vaz_def" },
        ]
      },
    ]
  });
};
