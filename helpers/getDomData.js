const { client } = require('nightwatch-api');
const { assert } = require('chai');

const idsFromElements = async (cssSelector) => {
  let elements;
  await client.elements('css selector', cssSelector, ({ value }) => {
    elements = value.map((element) => element.ELEMENT);
    assert.isNotEmpty(elements, `No elements found with selector "${cssSelector}"`);
  });
  return elements;
};

const textFromElements = async (cssSelector) => {
  const texts = [];
  const elements = await idsFromElements(cssSelector);
  for (const elementId of elements) {
    await client.elementIdText(elementId, ({ value }) => {
      texts.push(value);
    });
  }
  return texts;
};

const textFromElement = async (cssSelector) => {
  let text;
  const elementId = await idFromElement(cssSelector);
  await client.elementIdText(elementId, ({ value }) => {
    text = value;
  });
  return text;
};

const idFromElement = async (cssSelector) => {
  let element;
  await client.element('css selector', cssSelector, ({ value }) => {
    element = value.ELEMENT;
    assert.isDefined(element, `Element not found with selector "${cssSelector}"`);
  });
  return element;
};

const getDomData = {
  idFromElement: (cssSelector) => idFromElement(cssSelector),
  idsFromElements: (cssSelector) => idsFromElements(cssSelector),
  textFromElement: (cssSelector) => textFromElement(cssSelector),
  textFromElements: (cssSelector) => textFromElements(cssSelector),
};

module.exports = getDomData;
