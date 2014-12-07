module.exports = exports = EventMap;

function EventMap()
{
  this.events = {};
}

EventMap.prototype.on = function(name, callback)
{
  this.events[name] = callback;
};

EventMap.prototype.call = function(name, args)
{
  return this.events[name](args);
};

EventMap.prototype.delete = function(name)
{
  this.events[name] = undefined;
}

EventMap.prototype.clear = function()
{
  return this.events = {};
};
