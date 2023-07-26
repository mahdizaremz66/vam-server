const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const Organ = sequelize.define('t_organ', {
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

  Organ.associate = (models) => {
    Organ.belongsToMany(models.User, { through: models.UserOrgan, foreignKey: 'code_organ_usr', otherKey: 'user_name_usr' });
  };

  return Organ;
};
