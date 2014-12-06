module.exports = exports = EventMap;

function EventMap()
{
  this.events = [];
}

EventMap.prototype.on = function(name, callback)
{
  this.events[name] = callback;
};

EventMap.prototype.call = function(name)
{
  return this.events[name];
};