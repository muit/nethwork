/**
 * Module dependencies.
**/
var SocketIo = require("socket.io");

/**
 * Project dependencies
**/
Nethwork.Config   = require("./config");
Nethwork.EventMap = require("./eventmap");
Nethwork.User     = require("./user");
Nethwork.Opcode   = require("./opcode");
Nethwork.Script   = require("./script");

/**
 * Module exports.
**/
module.exports = Nethwork;
/**
 * Nethwork Costructor
 *
 * @api public
**/
function Nethwork(options)
{
	if (!(this instanceof Nethwork))
    return Nethwork.instance = new Nethwork(options);

  this.eventmap = new Nethwork.EventMap();
  this.config   = new Nethwork.Config(options);
}

Nethwork.prototype.start = function()
{
  if(!this.config || !this.eventmap)
    throw new NethworkNotInitialized("Config doesn´t exist.");
  this.io = SocketIo(this.config.port);

  this.io.on("connection", function(socket){
    var user = new Nethwork.User(socket, {});
    this.players.push(user);

    user.send("");
  });
};

Nethwork.prototype.stop = function()
{
  this.config = undefined;
  if(this.io) this.io.close();
};


/**
 * MainClass Events
**/
Nethwork.prototype.on = function(name, callback)
{
  this.eventmap.on(name, callback);
};

Nethwork.prototype.call = function(name)
{
  return this.eventmap.call(name);
};



/**
 * Errors
**/
function IncorrectArgumentType(message) {
    this.name = "IncorrectArgumentType";
    this.message = message || "";
}
IncorrectArgumentType.prototype = Error.prototype;

function NethworkNotInitialized(message) {
    this.name = "NethworkNotInitialized";
    this.message = message || "";
}
NethworkNotInitialized.prototype = Error.prototype;
