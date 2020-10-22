/*
Share information between steps that are not in the same file.
More variables can be added to this helper, if needed.
*/

const CONSTANTS = {
  URL: 'https://lorresourcetooldev02.azurewebsites.net/',
  LONG_TIMEOUT: 30000,
  MEDIUM_TIMEOUT: 10000,
  SHORT_TIMEOUT: 5000,
  DESIGN_COLORS: {
    BUTTONS: {
      MAP_TIMELINE: 'rgba(230, 230, 230, 1)',
      HIGHLIGHTED_BUTTON: 'rgba(255, 242, 0, 1)',
    },
    SIDEBAR: {
      HIGHLIGHTED_TAB_TEXT: 'rgba(255, 242, 0, 1)',
    },
  },
};

module.exports = CONSTANTS;
