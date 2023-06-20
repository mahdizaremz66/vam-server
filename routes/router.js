const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');


// http://localhost:3000/api/login
router.post('/login', (req, res, next) => {
  db.query(
    `SELECT * FROM t_users WHERE user_name = ?;`,
    [req.body.username],
    (err, result) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(400).send({
          message: 'Username or password incorrect!',
        });
      }

      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          if (bErr) {
            return res.status(400).send({
              message: 'Username or password incorrect!',
            });
          }
          if (bResult) {
            // password match
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
              },
              'SECRETKEY',
              { expiresIn: '7d' }
            );
            db.query(`UPDATE t_user SET last_login = now() WHERE id = ?;`, [
              result[0].id,
            ]);
            return res.status(200).send({
              message: 'Logged in!',
              token,
              user: result[0],
            });
          }
          return res.status(400).send({
            message: 'Username or password incorrect!',
          });
        }
      );
    }
  );
});

// http://localhost:3000/api/secret-route
router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is secret content!');
});

module.exports = router;