module.exports = exports = Game;
var Nethwork = GLOBAL.Nethwork;

/**
 * Methods can be monkeypatched to customize the working flow
 */


function Game(host_player)
{
  this.join(host_player);
  this.host = host_player;
}

Game.prototype.players = [];

Game.prototype.join = function(player)
{
  if(player instanceof Nethwork.User)
    throw new NotAnUser("provided player is not an User");
  this.players.push(player);

  player.on(Opcode.I_GAME_LEAVE, function(){
    this.leave(player);
  });

  player.on(Opcode.I_GAME_CLOSE, function(){
    //player variable may not be the correct player. POSSIBLE BUG
    if(player == host_player)
      this.close();
  });
};

Game.prototype.leave = function(player)
{
  this.players.remove(player);
  player.removeListeners(Opcode.I_GAME_LEAVE);
  player.removeListeners(Opcode.I_GAME_CLOSE);
  if(this.players.length === 0)
    this.close();
};



Game.prototype.start = function()
{
  this.send(Opcode.O_GAME_START, {wait:15});
};

Game.prototype.end = function(winner)
{
  this.send(Opcode.O_GAME_END, {winner: winner});
};

Game.prototype.close = function(){
  this.send(Opcode.O_GAME_CLOSE);
  this.removeListeners(Opcode.I_GAME_LEAVE);
  this.removeListeners(Opcode.I_GAME_CLOSE);
};



Game.prototype.send = function(op, data)
{
  for(var i = 0, len = this.players.length; i < len; i++)
    this.players[i].send(op, data);
};

Game.prototype.on = function(op, callback)
{
  for(var i = 0, len = this.players.length; i < len; i++)
    this.players[i].on(op, callback);
};

Game.prototype.removeListeners = function(name)
{
  for(var i = 0, len = this.players.length; i < len; i++)
    this.players[i].removeListeners(name);
};


/**
 * Errors
**/
function NotAnUser(message) {
    this.name = "NotAnUser";
    this.message = message || "";
}
NotAnUser.prototype = Error.prototype;
