const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_organ_etebar', {
    code_organ_etb: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 't_organ',
        key: 'code_organ_org'
      }
    },
    index_etebar_etb: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_etebar_etb: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    mblg_etebar_etb: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    descp_etebear_etb: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_organ_etebar',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_organ_etb" },
          { name: "index_etebar_etb" },
        ]
      },
    ]
  });
};
