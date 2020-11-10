const { client } = require('nightwatch-api');
const { Then, Given, When } = require('cucumber');
const { constants, getSelector, getDomData } = require('../../helpers');
const { assert, expect } = require('chai');

//Global vars
let candName;

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

Then(/^user sees the "([^"]*)" displayed as "([^"]*)" on Find Candidates screen$/, async (pageElement, data) => {
  let elementSelector;
  switch (pageElement) {
    case 'title':
      elementSelector = getSelector.findCandidates.emptyShortlist.title();
      break;
    case 'date and label':
      elementSelector = getSelector.findCandidates.emptyShortlist.dateAndLabel();
      break;
    case 'explainer text':
      elementSelector = getSelector.findCandidates.emptyShortlist.explainerText();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementVisible(elementSelector, constants.MEDIUM_TIMEOUT);
  await client.getText(elementSelector, ({ value }) =>
    assert.equal(value, data, `${pageElement} did not match the expected ${data}!`),
  );
});

Given(/^user sees at least one candidate in the shortlist$/, async () => {
  const optionsCandidates = getSelector.findCandidates.shortList.candidate();
  const addBtn = getSelector.findCandidates.candidateList.addToOptionBtn();

  const foundCandidates = await getDomData.idsFromElements(optionsCandidates);
  const foundButtons = await getDomData.idsFromElements(addBtn);

  if (foundCandidates.length === 0) await client.elementIdClick(foundButtons[0]);
});

When(
  /^user clicks the "(Suggest candidate|Remove from shortlist)" button from the first candidate card$/,
  async (button) => {
    const { suggestCandidateBtn, removeFromListBtn } = getSelector.findCandidates.shortList;
    const candidateName = getSelector.findCandidates.candidateList.candidateName();
    const selector = button === 'Suggest candidate' ? suggestCandidateBtn() : removeFromListBtn();

    const foundElements = await getDomData.idsFromElements(selector);
    let elementId;
    await client.elementIdElement(foundElements[0], 'css selector', candidateName, ({ value }) => {
      elementId = value.ELEMENT;
    });

    await client.elementIdText(elementId, ({ value }) => {
      candName = value.ELEMENT;
    });

    await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).elementIdClick(foundElements[0]);
  },
);

Then(/^user sees Toast present with the following success message "([^"]*)"$/, async (message) => {
  const selector = getSelector.findCandidates.toast();
  await client.waitForElementPresent(selector, constants.MEDIUM_TIMEOUT).assert.containsText(selector, message);
});

Then(/^user sees the suggested candidate with the status Awaiting confirmation$/, async () => {
  const { candidateCard, candidateName, awaitingRole } = getSelector.projectDetails.hierarchy;

  const foundElements = await getDomData.idsFromElements(candidateCard());

  let elementId;
  let found = false;
  for (const element of foundElements) {
    await client.elementIdElement(element, 'css selector', candidateName(), ({ value }) => {
      elementId = value.ELEMENT;
    });

    await client.elementIdText(elementId, ({ value }) => {
      if (value === candName) found = true;
    });

    if (found) break;
  }
  if (!found) throw new Error(`Candidate with the name:"${candName}" not found in the hierarchy!`);

  await client.elementIdElement(elementId, 'css selector', awaitingRole(), ({ value }) => {
    const elementId = value.ELEMENT;
    assert.isDefined(elementId, 'The suggested candidate has not Awaiting confirmation status!');
  });
});

When(/^user clicks filter button on Find Candidates screen$/, async () => {
  const selector = getSelector.findCandidates.filterBtn();
  await client.waitForElementPresent(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(/^user "(sees|does not see)" the filter modal opened on Find Candidates screen$/, async (action) => {
  const selector = getSelector.findCandidates.filterModal.modal();
  if (action === 'sees') await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  else await client.waitForElementNotPresent(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user sees "([^"]*)" as the title of candidate list filter modal$/, async (text) => {
  const selector = getSelector.findCandidates.filterModal.title();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  await client.getText(selector, ({ value }) => expect(text).to.equal(value));
});

Then(/^user "(sees|clicks)" "(Close|Apply|Clear)" button on candidate list filter modal$/, async (action, button) => {
  let selector;
  switch (button) {
    case 'Apply':
      selector = getSelector.findCandidates.filterModal.applyBtn();
      break;
    case 'Close':
      selector = getSelector.findCandidates.filterModal.closeBtn();
      break;
    case 'Clear':
      selector = getSelector.findCandidates.filterModal.clearBtn();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  if (action === 'sees') await client.waitForElementVisible(selector);
  else await client.waitForElementVisible(selector).click(selector);
});

Then(/^user sees "([^"]*)" label on candidate list filter modal$/, async (filterOption) => {
  let labelSelector;
  switch (filterOption) {
    case 'Demobilisation date':
      labelSelector = getSelector.findCandidates.filterModal.demobilisationDate.label();
      break;
    case 'Minimum grade':
      labelSelector = getSelector.findCandidates.filterModal.minimumGrade.label();
      break;
    case 'Job role':
      labelSelector = getSelector.findCandidates.filterModal.jobRole.label();
      break;
    case 'Location (region)':
      labelSelector = getSelector.findCandidates.filterModal.location.label();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client
    .waitForElementVisible(labelSelector, constants.MEDIUM_TIMEOUT)
    .getText(labelSelector, ({ value }) => expect(filterOption).to.equal(value));
});

When(
  /^user selects "([^"]*)" as an option for "(Job role|Location)" on candidate list filter modal$/,
  async (option, filter) => {
    let selector;
    switch (filter) {
      case 'Job role':
        selector = getSelector.findCandidates.filterModal.jobRole.dropdown();
        break;
      case 'Location':
        selector = getSelector.findCandidates.filterModal.location.dropdown();
        break;
      default:
        throw new Error('Incorrect case inputted!');
    }
    const filterOption = getSelector.findCandidates.filterModal.dropDownOption(option);
    await client
      .moveToElement(selector, 1, 1)
      .mouseButtonDown(0)
      .waitForElementVisible(filterOption)
      .click(filterOption)
      .pause(1000);
  },
);

Then(/^user "(sees|does not see)" the filter preview section on Find Candidates screen$/, async (action) => {
  const selector = getSelector.findCandidates.filterPreview.filterPreviewSection();
  if (action === 'sees') await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  else await client.waitForElementNotPresent(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user sees "([^"]*)" as the title of filter preview section$/, async (text) => {
  const selector = getSelector.findCandidates.filterPreview.title();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  await client.getText(selector, ({ value }) => expect(text).to.equal(value));
});

Then(/^user "(sees|clicks)" "([^"]*)" button on filter preview of Find Candidates screen$/, async (action, button) => {
  const selector = getSelector.findCandidates.filterPreview.removeFilterBtn();
  if (action === 'sees')
    await client.waitForElementVisible(selector).getText(selector, ({ value }) => expect(button).to.equal(value));
  else
    await client
      .waitForElementVisible(selector)
      .getText(selector, ({ value }) => expect(button).to.equal(value))
      .click(selector);
});

Then(/^user sees "([^"]*)" set as filter option by "([^"]*)" on Find Candidates screen$/, async (option, category) => {
  let selector;
  switch (category) {
    case 'Demobilisation date':
      selector = getSelector.findCandidates.filterPreview.demobilisationDateFilter();
      break;
    case 'Minimum grade':
      selector = getSelector.findCandidates.filterPreview.gradeFilter();
      break;
    case 'Job role':
      selector = getSelector.findCandidates.filterPreview.jobRoleFilter();
      break;
    case 'Location':
      selector = getSelector.findCandidates.filterPreview.locationFilter();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getText(selector, ({ value }) => expect(option).to.equal(value));
});

Then(
  /^user sees "([^"]*)" as the selected option for "(Job role|Location)" on cadidate list filter modal$/,
  async (option, filter) => {
    let selector;
    switch (filter) {
      case 'Job role':
        selector = getSelector.findCandidates.filterModal.jobRole.dropdown();
        break;
      case 'Location':
        selector = getSelector.findCandidates.filterModal.location.dropdown();
        break;
      default:
        throw new Error('Incorrect case inputted!');
    }
    const optionToCheck = option === 'Blank' ? '' : option;
    await client.assert.value(selector, optionToCheck);
  },
);

Then(/^user sees the minimum grade "([^"]*)" checkbox unchecked$/, async (grade) => {
  let selector;
  switch (grade) {
    case '4':
      selector = getSelector.findCandidates.filterModal.minimumGrade.fourCheckbox();
      break;
    case '5':
      selector = getSelector.findCandidates.filterModal.minimumGrade.fiveCheckbox();
      break;
    case '6':
      selector = getSelector.findCandidates.filterModal.minimumGrade.sixCheckbox();
      break;
    case '7':
      selector = getSelector.findCandidates.filterModal.minimumGrade.sevenCheckbox();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementPresent(selector, constants.MEDIUM_TIMEOUT);
  await client.expect.element(selector).to.not.be.selected;
});

When(/^user sets minimum grade to "([^"]*)" on candidate list filter modal$/, async (grade) => {
  let selector;
  switch (grade) {
    case '4':
      selector = getSelector.findCandidates.filterModal.minimumGrade.fourCheckbox();
      break;
    case '5':
      selector = getSelector.findCandidates.filterModal.minimumGrade.fiveCheckbox();
      break;
    case '6':
      selector = getSelector.findCandidates.filterModal.minimumGrade.sixCheckbox();
      break;
    case '7':
      selector = getSelector.findCandidates.filterModal.minimumGrade.sevenCheckbox();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementPresent(selector, constants.MEDIUM_TIMEOUT).click(selector);
});
