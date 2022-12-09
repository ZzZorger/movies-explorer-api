const router = require('express').Router();
const {
  signout,
} = require('../controllers/user');

router.get('/signout', signout);

module.exports = router;
