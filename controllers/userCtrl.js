var UserModel = require('./../models/userModel');

module.exports = {
  login: function(req, res, next){
      res.send(req.user);
  },
  getMe: function(req,res) {
    if(!req.user){
      return res.send();
    }
    UserModel
    .findById(req.user._id)
    .exec(function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  logout: function(req,res) {
    var id = req.user.id
    req.logout();
    console.log(id + " logged out");
    res.send(id + " logged out");
  },
  read: function(req, res){
    UserModel
    .find(req.query)
    .populate('moviesPosted')
    .exec(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  update: function(req, res){
    UserModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  destroy: function(req, res){
    UserModel.findByIdAndRemove(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
};
