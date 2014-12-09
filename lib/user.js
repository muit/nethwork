module.exports = exports = User;

var Nethwork = GLOBAL.Nethwork;
var Opcode = Nethwork.Opcode;

function User(socket)
{
  this.socket = socket;
  this.loggedIn = false;

  var self = this;
  this.on(Opcode.I_LOGOUT, function(){
    self.send(Opcode.O_LOGOUT);
    self.loggedIn = false;
  });
}

User.prototype.send = function(op, data)
{
  this.socket.emit(op, data);
};
User.prototype.on = function(op, callback)
{
  return this.socket.on(op, callback);
};

User.prototype.onLogin = function(callback)
{
  var self = this;
  this.on(Opcode.I_LOGIN, function(user, pass){
    var status = callback(user, pass);
    if(status === true)
    {
      self.send(Opcode.O_LOGIN_SUCCESS);
      self.loggedIn = true;
    }
    else if(status === false)
    {
      self.send(Opcode.O_LOGIN_FAILURE);
      self.loggedIn = false;
    }
    else
    {
      self.send(Opcode.O_LOGIN_ERROR);
      self.loggedIn = false;
    }
  });
};

