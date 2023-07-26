const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_sms_rec', {
    id_sms_rec: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    condition_sms_rec: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    true_opr_sms_rec: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    false_opr_sms_rec: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_sms_rec',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_sms_rec" },
        ]
      },
    ]
  });
};
