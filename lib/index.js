/**
 * Module dependencies.
**/
var SocketIo = require("socket.io");

/**
 * Project dependencies
**/
var Config = require("./config");
var EventMap = require("./eventmap");
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
  this.eventmap = new EventMap();
  this.config = new Config(options);
}

Nethwork.prototype.start = function()
{
  if(!this.config || !this.eventmap)
    throw new NethworkNotInitialized("Config doesn´t exist.");
  this.io = SocketIo(this.config.port);
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


Nethwork.Packet = function(opcode, data){
  if (!(this instanceof Nethwork.Packet))
    return new Nethwork.Packet(opcode, data);
  this.opcode = opcode;
  this.data = data;
};
Nethwork.Packet.prototype.send = function(){

};

Nethwork.Opcode = function(identifier){};

Nethwork.Script = function(){};


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
