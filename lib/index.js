/**
 * Module dependencies.
 */
var SocketIo = require "socket.io"

/**
 * Module exports.
 */
module.exports = Nethwork;

/**
 * Nethwork Costructor
 *
 * @api public
 */
function Nethwork()
{
	if (!(this instanceof Nethwork))
        return Nethwork.instance = new Nethwork();
}
