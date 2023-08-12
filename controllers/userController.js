const sequelize = require('../config/database');

const t_user = require('../models/t_user');
const t_user_log = require('../models/t_user_log');
const t_user_organ = require('../models/t_user_organ');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-jalaali');

exports.createUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { user_name_usr, pass_word_usr, name_usr, mobile_usr, level_usr, access_usr, top_user_usr, organs, user_name_log } = req.body;

    // Check if the user has the necessary access to create a new user
    const LogUserAccess = await t_user.findOne({ where: { user_name_usr: user_name_log } });
    // if (!creatingUserAccess || creatingUserAccess.access_usr !== '11111') {
    //   return res.status(403).json({ message: 'دسترسی لازم برای ایجاد کاربر را ندارید.' });
    // }

    // Check if the new user's access level is lower or equal to the top user's access level
    const topUserAccess = await t_user.findOne({ where: { user_name_usr: top_user_usr } });
    // if (topUserAccess && topUserAccess.access_usr < access_usr) {
    //   return res.status(400).json({ message: 'سطح دسترسی کاربر نمی تواند بیشتر از کاربر والدش باشد.' });
    // }

    const existingUser = await t_user.findOne({ where: { user_name_usr } });
    if (existingUser) {
      return res.status(400).json({ message: 'کاربر با این نام کاربری وجود دارد' });
    }

    const hashedPassword = await bcrypt.hash(pass_word_usr, 10);

    const user = await t_user.create({
      user_name_usr,
      pass_word_usr: hashedPassword,
      name_usr,
      mobile_usr,
      level_usr,
      access_usr,
      top_user_usr
    }, { transaction });

    // Update UserOrgan access
    await t_user_organ.destroy({ where: { user_name_usr }, transaction });
    if (level_usr != 'admin') {
      for (const organCode of organs) {
        await t_user_organ.create({ user_name_usr, code_organ_usr: organCode }, { transaction });
      }
    }

    //Create log
    const lastLog = await t_user_log.findOne({
      where: { user_name_log: user_name_log },
      order: [['index_log', 'DESC']],
      attributes: ['index_log'],
      raw: true,
      transaction
    });
    const newIndex = lastLog ? lastLog.index_log + 1 : 1;
    await t_user_log.create({
      user_name_log: user_name_log,
      index_log: newIndex,
      date_log: moment().format('jYYYY/jMM/jDD'),
      time_log: moment().format('HH:mm:ss'),
      descp_log: 'ایجاد کاربر جدید با نام کاربری ' + user_name_usr
    }, { transaction });

    await transaction.commit();

    res.json({ user, message: 'کابر جدید با موفقیت ایجاد شد.' });
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    res.status(500).json({ message: 'عملیات با خطا مواجه شد: خطای داخلی سرور!' });
  }
};

exports.updateUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { user_name_usr } = req.params;
    const { pass_word_usr, name_usr, mobile_usr, level_usr, access_usr, top_user_usr, organs, user_name_log } = req.body;

    const user = await t_user.findOne({ where: { user_name_usr } });
    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد.' });
    }

    user.pass_word_usr = pass_word_usr || user.pass_word_usr;
    user.name_usr = name_usr || user.name_usr;
    user.mobile_usr = mobile_usr || user.mobile_usr;
    user.level_usr = level_usr || user.level_usr;
    user.access_usr = access_usr || user.access_usr;
    user.top_user_usr = top_user_usr || user.top_user_usr;
    await user.save({ transaction });

    // Update UserOrgan access
    await t_user_organ.destroy({ where: { user_name_usr }, transaction });
    if (level_usr != 'admin') {
      for (const organCode of organs) {
        await t_user_organ.create({ user_name_usr, code_organ_usr: organCode }, { transaction });
      }
    }

    //Create log
    const lastLog = await t_user_log.findOne({
      where: { user_name_log: user_name_log },
      order: [['index_log', 'DESC']],
      attributes: ['index_log'],
      raw: true,
      transaction
    });
    const newIndex = lastLog ? lastLog.index_log + 1 : 1;
    await t_user_log.create({
      user_name_log: user_name_log,
      index_log: newIndex,
      date_log: moment().format('jYYYY/jMM/jDD'),
      time_log: moment().format('HH:mm:ss'),
      descp_log: 'ویرایش کاربر با نام کاربری ' + user_name_usr
    }, { transaction });

    await transaction.commit();

    res.json({ user, message: 'کابر با موفقیت ویرایش شد.' });
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    res.status(500).json({ message: 'عملیات با خطا مواجه شد: خطای داخلی سرور!' });
  }
};

exports.deleteUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { user_name_usr, user_name_log } = req.params;

    const user = await t_user.findOne({ where: { user_name_usr } });
    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد.' });
    }

    await user.destroy({ transaction });

    // Remove UserOrgan access
    await t_user_organ.destroy({ where: { user_name_usr }, transaction });

    //Create log
    const lastLog = await t_user_log.findOne({
      where: { user_name_log: user_name_log },
      order: [['index_log', 'DESC']],
      attributes: ['index_log'],
      raw: true,
      transaction
    });
    const newIndex = lastLog ? lastLog.index_log + 1 : 1;
    await t_user_log.create({
      user_name_log: user_name_log,
      index_log: newIndex,
      date_log: moment().format('jYYYY/jMM/jDD'),
      time_log: moment().format('HH:mm:ss'),
      descp_log: 'حذف کاربر با نام کاربری ' + user_name_usr
    }, { transaction });

    await transaction.commit();

    res.json({ message: 'کابر با موفقیت حذف شد.' });
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    res.status(500).json({ message: 'عملیات با خطا مواجه شد: خطای داخلی سرور!' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { user_name_usr, pass_word_usr } = req.body;

    const user = await t_user.findOne({ where: { user_name_usr } });
    if (!user) {
      return res.status(404).json({ message: 'نام کاربری یا رمز عبور اشتباه است.1' });
    }

    const isValidPassword = await bcrypt.compare(pass_word_usr, user.pass_word_usr);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است.2' });
    }

    const token = jwt.sign({ user_name_usr: this.user_name_usr }, 'secret_key', { expiresIn: '3h' });

    user.token_usr = token;
    user.token_expr_usr = new Date(Date.now() + 3 * 60 * 60 * 1000); // Set token expiration time to 3 hours from now;
    await user.save();

    const userOrgans = await t_user_organ.findAll({ where: { user_name_usr }, attributes: ['code_organ_usr'], raw: true });
    const organCodes = userOrgans.map(userOrgan => userOrgan.code_organ_usr);

    res.json({ user, organCodes, message: 'کاربر گرامی ' + user.name_usr + ' به سامانه خوش آمدید!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'عملیات با خطا مواجه شد: خطای داخلی سرور!' });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const { user_name_usr } = req.params;

    // Find the user
    const user = await t_user.findOne({ where: { user_name_usr } });
    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد.' });
    }

    // Clear token and token expiration
    user.token_usr = null;
    user.token_expr_usr = null;
    await user.save();

    res.json({ message: 'خروج از سامانه با موفقیت انجام شد.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'عملیات با خطا مواجه شد: خطای داخلی سرور!' });
  }
};

exports.changePassword = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { user_name_usr, old_password, new_password } = req.body;

    // Find the user
    const user = await t_user.findOne({ where: { user_name_usr } });
    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد.' });
    }

    // Validate the old password
    const isValidPassword = await bcrypt.compare(old_password, user.pass_word_usr);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'رمز عبور فعلی صحیح نیست.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update the password
    user.pass_word_usr = hashedPassword;
    await user.save({ transaction });

    // Log password change
    await t_user_log.create({
      user_name_log: user_name_usr,
      index_log: newIndex,
      date_log: moment().format('jYYYY/jMM/jDD'),
      time_log: moment().format('HH:mm:ss'),
      descp_log: 'تغییر رمز عبور کاربری'
    }, { transaction });

    await transaction.commit();

    res.json({ message: 'رمز عبور با موفقیت تغییر یافت.' });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    res.status(500).json({ message: 'عملیات با خطا مواجه شد: خطای داخلی سرور!' });
  }
};

module.exports = exports;