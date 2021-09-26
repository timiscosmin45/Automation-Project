module.exports = {
  formatProducts: (input) => {
    const reg = /^\w+\s?\w+/;
    if (typeof input !== 'object') return input.match(reg)[0];
    return input.map((product) => product.match(reg)[0]);
  },
};
