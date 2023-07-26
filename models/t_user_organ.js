const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const t_user_organ = sequelize.define('t_user_organ', {
  user_name_usr: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 't_user',
      key: 'user_name_usr'
    }
  },
  code_organ_usr: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 't_organ',
      key: 'code_organ_org'
    }
  }
}, {
  tableName: 't_user_organ',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "user_name_usr" },
        { name: "code_organ_usr" },
      ]
    },
    {
      name: "r_user_organ_organ",
      using: "BTREE",
      fields: [
        { name: "code_organ_usr" },
      ]
    },
  ]
});

t_user_organ.associate = function (models) {
  t_user_organ.belongsTo(models.t_user, { foreignKey: 'user_name_usr', targetKey: 'user_name_usr' });
  t_user_organ.belongsTo(models.t_organ, { foreignKey: 'code_organ_usr', targetKey: 'code_organ_org' });
};


module.exports = t_user_organ;