var express = require('express');
var router = express.Router();
let userRepo=require('../repository/user.repo');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/login')
.post(userRepo.login);

module.exports = router;
