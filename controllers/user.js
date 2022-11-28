// const bcrypt = require('bcryptjs');
const User = require('../models/user');

// module.exports.getUser = (req, res, next) => {
//   User.find({})
//     .then((users) => res.status(200).send({ data: users }))
//     .catch((err) => next(err));
// };
module.exports.createUser = (req, res) => {
  const {
    name, email,
  } = req.body;
  User.create({
    name,
    email,
  })
    .then(() => res.send({
      name,
      email,
    }));
};
