const { client } = require('nightwatch-api');
const { Then } = require('cucumber');
const { constants, getSelector, getDomData } = require('../../helpers');
const { assert } = require('chai');

Then(/^user sees the "([^"]*)" title$/, async (title) => {
  const selector = getSelector.findCandidates.candidatesListTitle();
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getText(selector, ({ value }) => assert.equal(value, title));
});

Then(/^user sees "([^"]*)" as the name of the selected role$/, async (roleName) => {
  const selector = getSelector.findCandidates.selectedRoleName();
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getText(selector, ({ value }) => assert.equal(value, roleName));
});

Then(/^user sees the list of candidates on Find Candidates screen$/, async () => {
  const selector = getSelector.findCandidates.candidatesList();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user sees candidate's "([^"]*)" for each candidate on Find Candidates screen$/, async (candidateData) => {
  const selector = getSelector.findCandidates.candidate();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  let elementSelector;
  switch (candidateData) {
    case 'name':
      elementSelector = getSelector.findCandidates.candidateName();
      break;
    case 'job title':
      elementSelector = getSelector.findCandidates.candidateJobTitle();
      break;
    case 'grade':
      elementSelector = getSelector.findCandidates.candidateGrade();
      break;
    case 'home postcode':
      elementSelector = getSelector.findCandidates.candidateHomePostcode();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  const foundElements = await getDomData.idsFromElements(selector);
  for (const element of foundElements) {
    await client.elementIdElement(element, 'css selector', elementSelector, ({ value }) => {
      const elementId = value.ELEMENT;
      assert.isDefined(elementId, `${candidateData} not found!`);
    });
  }
});

Then(/^user sees the empty shortlist with 4 slots$/, async () => {
  const selector = getSelector.findCandidates.emptyShortlist.slot();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  const foundElements = await getDomData.idsFromElements(selector);
  const slotsNumber = foundElements.length;
  await client.assert.strictEqual(slotsNumber, 4, '4 empty shortlist slots were not found!');
});

Then(/^user sees the title "([^"]*)" of the empty shortlist$/, async (title) => {
  const selector = getSelector.findCandidates.emptyShortlist.title();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  await client.getText(selector, ({ value }) =>
    assert.equal(value, title, `Empty shortilist title is different from ${title}`),
  );
});

Then(/^user sees the role needed by date and label as "([^"]*)"$/, async (dateAndLabel) => {
  const selector = getSelector.findCandidates.emptyShortlist.dateAndLabel();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  await client.getText(selector, ({ value }) =>
    assert.equal(value, dateAndLabel, `Date and label did not match ${dateAndLabel}`),
  );
});
