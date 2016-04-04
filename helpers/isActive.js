// helper for adding active class to navbar items
module.exports = function getIsActive(location) {
  return function isActive(current) {
    return current == location ? 'active' : '';
  };
};
