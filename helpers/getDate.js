const moment = require('moment');
module.exports = {
  getYear: (text) => {
    const currentDate = moment();
    const getWantedYear = () => {
      switch (text) {
        case 'current year':
          return currentDate;
        case 'last year':
          return currentDate.subtract('1', 'years');
        case 'next year':
          return currentDate.add('1', 'years');
        default: {
          const newReg = /^\d{1,2}\syears?\s(later|earlyer)$/;
          if (!newReg.test(text)) throw new Error('Incorrect date format!');
          const no = text.match(/\d{1,2}/)[0];
          if (text.includes('later')) return currentDate.add(no, 'years'); // e.g '2 years later'
          return currentDate.subtract(no, 'years'); // e.g '10 years earlyer'
        }
      }
    };
    return getWantedYear().format('YYYY');
  },
};
