module.exports = exports = Config;
var Nethwork = GLOBAL.Nethwork;

function Config(options)
{
    if (!(this instanceof Config))
        return new Config(options);

    options = options || {};
    for(var p in options)
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

      "I_GAME_NEW"     : 0x010,
      "I_GAME_JOIN"    : 0x011,
      "O_GAME_JOIN"    : 0x012,
      "I_GAME_LEAVE"   : 0x013,
      "O_GAME_LEAVE"   : 0x014,
      "I_GAME_CLOSE"   : 0x015,
      "O_GAME_CLOSE"   : 0x016,
      "I_GAME_LIST"    : 0x017,
      "O_GAME_LIST"    : 0x018,
      "I_GAME_START"   : 0x019,
      "O_GAME_END"     : 0x020,
    });
    //Charge custom opcodes
    //If any of the opcodes is repeated, it will be replaced
    Nethwork.Opcode(this.opcodes?this.opcodes:{});
    this.opcodes = undefined;
}
