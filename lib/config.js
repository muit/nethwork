module.exports = exports = Config;

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
}
