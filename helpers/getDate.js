const moment = require('moment');
module.exports = {
  getYear: (text) => {
    /*
    @param {string} text
      Retrieve years based on a specific text, e.g:
    * getDate.getYear('current year'); -- > 2020
    * getDate.getYear('last year'); --> 2019
    * getDate.getYear('next year'); --> 2021
    * getDate.getYear('3 years later'); --> current year + 3 years (2023)
    * getDate.getYear('2years earlyer'); --> current year - 2 years (2018)
*/
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
          if (!newReg.test(text)) {
            throw new Error('Incorrect date format!');
          }

          const numberOfYears = text.match(/\d{1,2}/)[0];
          if (text.includes('later')) {
            return currentDate.add(numberOfYears, 'years');
          }
          return currentDate.subtract(numberOfYears, 'years');
        }
      }
    };
    return getWantedYear().format('YYYY');
  },
};
