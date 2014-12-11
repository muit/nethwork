/**
 * Module dependencies.
**/
var SocketIo = require("socket.io");

/**
 * Project dependencies
**/
GLOBAL.Utyl = Utyl = Utyl || require("./utyl/utyl.js");

Nethwork.Config   = require("./config");
Nethwork.EventMap = require("./eventmap");
Nethwork.User     = require("./user");
Nethwork.Opcode   = Opcode = require("./opcode");
Nethwork.Script   = require("./script");

/**
 * Module exports.
**/
module.exports = GLOBAL.Nethwork = Nethwork;
/**
 * Nethwork Costructor
 *
 * @api public
**/
function Nethwork(options)
{
	if (!(this instanceof Nethwork))
    return (Nethwork.instance = new Nethwork(options));

  this.eventmap = new Nethwork.EventMap();
  this.config   = new Nethwork.Config(options);
}

Nethwork.prototype.start = function()
{
  if(!this.config || !this.eventmap)
    throw new NethworkNotInitialized("Config doesn´t exist.");
  this.io = SocketIo(this.config.port);
    Nethwork.log("Listening on port "+this.config.port);
  var self = this;
  this.io.on("connection", function(socket){
    Nethwork.log("New User.");
    var user = new Nethwork.User(socket, {});
    self.players.push(user);

    user.send(Opcode.CONNECTED);
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
Nethwork.prototype.on = function(name, callback, linked)
{
  this.eventmap.on(name, callback);
};

Nethwork.prototype.call = function(name)
{
  return this.eventmap.call(name);
};

/**
 *
 **/
Nethwork.prototype.load = function()
{

};

Nethwork.prototype.log = function(message){
  if(this.config && this.config.log)
    console.log("Nethwork: "+message);
};
Nethwork.log = function(message){ Nethwork.instance.log(message); };

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
