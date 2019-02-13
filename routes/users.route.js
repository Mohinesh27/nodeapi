var express = require('express');
var router = express.Router();
let userRepo=require('../repository/user.repo');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
.get(userRepo.get)
.post(userRepo.new);

router.route('/:id')
.get(userRepo.view)
.patch(userRepo.update)
.put(userRepo.update)
.delete(userRepo.delete);


module.exports = router;
