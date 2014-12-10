module.exports = exports = Config;
var Nethwork = GLOBAL.Nethwork;

function Config(options)
{
    if (!(this instanceof Config))
        return new Config(options);

    options = options || {};
    for(p in options)
        this[p] = options[p];

    //Default Values:
    this.log   = (options.log === undefined)? true : options.log;
    this.port  = options.port || 14494;

    this.login = options.login || {};
    this.login.enabled = this.login.enabled || false;

    //OPCODES

    //Default
    Nethwork.Opcode({
      "O_CONNECTED"    : 0X001,
      "O_DISCONNECTED" : 0X002,

      "I_LOGIN"        : 0X003,
      "O_LOGIN_SUCCESS": 0X005,
      "O_LOGIN_FAILURE": 0X006,
      "O_LOGIN_ERROR"  : 0X007,
      "I_LOGOUT"       : 0X008,
      "O_LOGOUT"       : 0X009,
    });
    //Charge custom opcodes
    //If any of the opcodes is repeated, it will be replaced
    Nethwork.Opcode(this.opcodes?this.opcodes:{});
    this.opcodes = undefined;
}
