module.exports = exports = Opcode;

function Opcode(list)
{
  if(typeof list != "object") throw new ArgumentTypeError("The list provided must be an object.");
  keys = Object.keys(list);
  for(var i = 0, len = keys.length; i < len; i++){
    Opcode.create(keys[i], list[keys[i]]);
  }
}

Opcode.values = {};
Opcode.create = function(name, value)
{
  this[name.toUpperCase()] = value;
  this.values[value] = name.toUpperCase();
};
Opcode.get = function(value){ return this.values[value];};
Opcode.getValue = function(name){ return this[name];};


function ArgumentTypeError(message) {
    this.name = "ArgumentTypeError";
    this.message = message || "";
}
ArgumentTypeError.prototype = Error.prototype;


/**
 * Utyl Project Fragment
 * https://github.com/muit/utyl
 **/
Object.keys = function(object)
{
    var ret=[],p;
    for(p in object) if(Object.prototype.hasOwnProperty.call(object,p)) ret.push(p);
    return ret;
};
