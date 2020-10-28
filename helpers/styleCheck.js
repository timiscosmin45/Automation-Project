const { client } = require('nightwatch-api');
const { assert } = require('chai');
const getDomData = require('./getDomData');

module.exports = {
  // Check text, font color, font size and font style from a selector
  checkTextFont: async (selector, text, fontColor, fontSize, fontStyle) => {
    await client.assert.containsText(selector, text);
    await client.assert.cssProperty(selector, 'color', fontColor);
    await client.assert.cssProperty(selector, 'font-size', fontSize);
    await client.assert.cssProperty(selector, 'font-style', fontStyle);
  },
  // Check font color, font size and font style from an identified element
  checkFontById: async (id, fontColor, fontSize, fontStyle) => {
    let actualColor, actualSize, actualStyle;
    const promises = [
      client.elementIdCssProperty(id, 'color', ({ value }) => {
        actualColor = value;
      }),
      client.elementIdCssProperty(id, 'font-size', ({ value }) => {
        actualSize = value;
      }),
      client.elementIdCssProperty(id, 'font-style', ({ value }) => {
        actualStyle = value;
      }),
    ];
    await Promise.all(promises);
    assert.equal(actualColor, fontColor, `Element has color ${actualColor} but it should be ${fontColor}`);
    assert.equal(actualSize, fontSize, `Element has size ${actualSize} but it should be ${fontSize}`);
    assert.equal(actualStyle, fontStyle, `Element has style ${actualStyle} but it should be ${fontStyle}`);
  },
  // Check text, font color, font size and font style from an identified element
  checkTextFontById: async (id, text, fontColor, fontSize, fontStyle) => {
    let resText, resColor, resSize, resStyle;
    await client.elementIdText(id, ({ value }) => {
      resText = value;
    });
    await client.elementIdCssProperty(id, 'color', ({ value }) => {
      resColor = value;
    });
    await client.elementIdCssProperty(id, 'font-size', ({ value }) => {
      resSize = value;
    });
    await client.elementIdCssProperty(id, 'font-style', ({ value }) => {
      resStyle = value;
    });
    assert.ok(resText != '' && resText.indexOf(text) !== -1, `Text "${text}" not contained in "${resText}"`);
    assert.equal(resColor, fontColor, `${text} is not of color ${fontColor}`);
    assert.equal(resSize, fontSize, `${text} is not of size ${fontSize}`);
    assert.equal(resStyle, fontStyle, `${text} is not of style ${fontStyle}`);
  },
  // Check that each text of a list is strictly equal to each text of the elements obtained by the css selector
  checkTextMatching: async (selector, textList) => {
    const actualTextList = await getDomData.textFromElements(selector);
    assert.deepEqual(actualTextList, textList);
  },
  // Check that each text of a list is included in each text of the elements obtained by the css selector
  checkNestedTextMatching: async (selector, textList, errMsg) => {
    const actualTextList = await getDomData.textFromElements(selector);
    assert.strictEqual(actualTextList.length, textList.length, errMsg);
    for (const [index, actualText] of actualTextList.entries()) {
      assert.include(actualText, textList[index], errMsg);
    }
  },
};
