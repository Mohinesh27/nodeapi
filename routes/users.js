var express = require('express');
var router = express.Router();
let userRepo=require('../repository/user.repo');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create',function(req,res,next){
  var obj=req.body;
  var newUser=userRepo.create(obj);

  res.json(newUser);

})

module.exports = router;
