module.exports = exports = User;

function User(socket, data)
{
  this.socket = socket;
}

User.prototype.send = function(op, data){};
