var DataTypes = require("sequelize").DataTypes;
var _t_organ = require("./t_organ");
var _t_organ_etebar = require("./t_organ_etebar");
var _t_sms = require("./t_sms");
var _t_sms_def = require("./t_sms_def");
var _t_sms_rec = require("./t_sms_rec");
var _t_user = require("./t_user");
var _t_user_log = require("./t_user_log");
var _t_user_organ = require("./t_user_organ");
var _t_vam = require("./t_vam");
var _t_vam_vaz = require("./t_vam_vaz");
var _t_vaz = require("./t_vaz");

function initModels(sequelize) {
  var t_organ = _t_organ(sequelize, DataTypes);
  var t_organ_etebar = _t_organ_etebar(sequelize, DataTypes);
  var t_sms = _t_sms(sequelize, DataTypes);
  var t_sms_def = _t_sms_def(sequelize, DataTypes);
  var t_sms_rec = _t_sms_rec(sequelize, DataTypes);
  var t_user = _t_user(sequelize, DataTypes);
  var t_user_log = _t_user_log(sequelize, DataTypes);
  var t_user_organ = _t_user_organ(sequelize, DataTypes);
  var t_vam = _t_vam(sequelize, DataTypes);
  var t_vam_vaz = _t_vam_vaz(sequelize, DataTypes);
  var t_vaz = _t_vaz(sequelize, DataTypes);

  t_organ.belongsToMany(t_user, { as: 'user_name_usr_t_users', through: t_user_organ, foreignKey: "code_organ_usr", otherKey: "user_name_usr" });
  t_organ.belongsToMany(t_vaz, { as: 'code_vaz_def_t_vazs', through: t_sms_def, foreignKey: "code_org_def", otherKey: "code_vaz_def" });
  t_user.belongsToMany(t_organ, { as: 'code_organ_usr_t_organs', through: t_user_organ, foreignKey: "user_name_usr", otherKey: "code_organ_usr" });
  t_vaz.belongsToMany(t_organ, { as: 'code_org_def_t_organs', through: t_sms_def, foreignKey: "code_vaz_def", otherKey: "code_org_def" });
  t_organ_etebar.belongsTo(t_organ, { as: "code_organ_etb_t_organ", foreignKey: "code_organ_etb"});
  t_organ.hasMany(t_organ_etebar, { as: "t_organ_etebars", foreignKey: "code_organ_etb"});
  t_sms_def.belongsTo(t_organ, { as: "code_org_def_t_organ", foreignKey: "code_org_def"});
  t_organ.hasMany(t_sms_def, { as: "t_sms_defs", foreignKey: "code_org_def"});
  t_user_organ.belongsTo(t_organ, { as: "code_organ_usr_t_organ", foreignKey: "code_organ_usr"});
  t_organ.hasMany(t_user_organ, { as: "t_user_organs", foreignKey: "code_organ_usr"});
  t_user.belongsTo(t_user, { as: "top_user_usr_t_user", foreignKey: "top_user_usr"});
  t_user.hasMany(t_user, { as: "t_users", foreignKey: "top_user_usr"});
  t_user_log.belongsTo(t_user, { as: "user_name_log_t_user", foreignKey: "user_name_log"});
  t_user.hasMany(t_user_log, { as: "t_user_logs", foreignKey: "user_name_log"});
  t_user_organ.belongsTo(t_user, { as: "user_name_usr_t_user", foreignKey: "user_name_usr"});
  t_user.hasMany(t_user_organ, { as: "t_user_organs", foreignKey: "user_name_usr"});
  t_vam_vaz.belongsTo(t_user, { as: "user_name_vaz_t_user", foreignKey: "user_name_vaz"});
  t_user.hasMany(t_vam_vaz, { as: "t_vam_vazs", foreignKey: "user_name_vaz"});
  t_sms.belongsTo(t_vam, { as: "id_letter_sms_t_vam", foreignKey: "id_letter_sms"});
  t_vam.hasMany(t_sms, { as: "t_sms", foreignKey: "id_letter_sms"});
  t_sms.belongsTo(t_vam, { as: "date_letter_sms_t_vam", foreignKey: "date_letter_sms"});
  t_vam.hasMany(t_sms, { as: "date_letter_sms_t_sms", foreignKey: "date_letter_sms"});
  t_sms.belongsTo(t_vam, { as: "code_meli_sms_t_vam", foreignKey: "code_meli_sms"});
  t_vam.hasMany(t_sms, { as: "code_meli_sms_t_sms", foreignKey: "code_meli_sms"});
  t_vam_vaz.belongsTo(t_vam, { as: "id_letter_vaz_t_vam", foreignKey: "id_letter_vaz"});
  t_vam.hasMany(t_vam_vaz, { as: "t_vam_vazs", foreignKey: "id_letter_vaz"});
  t_vam_vaz.belongsTo(t_vam, { as: "date_letter_vaz_t_vam", foreignKey: "date_letter_vaz"});
  t_vam.hasMany(t_vam_vaz, { as: "date_letter_vaz_t_vam_vazs", foreignKey: "date_letter_vaz"});
  t_vam_vaz.belongsTo(t_vam, { as: "code_meli_vaz_t_vam", foreignKey: "code_meli_vaz"});
  t_vam.hasMany(t_vam_vaz, { as: "code_meli_vaz_t_vam_vazs", foreignKey: "code_meli_vaz"});
  t_sms_def.belongsTo(t_vaz, { as: "code_vaz_def_t_vaz", foreignKey: "code_vaz_def"});
  t_vaz.hasMany(t_sms_def, { as: "t_sms_defs", foreignKey: "code_vaz_def"});
  t_vam_vaz.belongsTo(t_vaz, { as: "code_vaz_vaz_t_vaz", foreignKey: "code_vaz_vaz"});
  t_vaz.hasMany(t_vam_vaz, { as: "t_vam_vazs", foreignKey: "code_vaz_vaz"});

  return {
    t_organ,
    t_organ_etebar,
    t_sms,
    t_sms_def,
    t_sms_rec,
    t_user,
    t_user_log,
    t_user_organ,
    t_vam,
    t_vam_vaz,
    t_vaz,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
