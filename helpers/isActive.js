module.exports = function getIsActive(location) {
  return function isActive(current) {
    return current == location ? 'active' : '';
  };
};
