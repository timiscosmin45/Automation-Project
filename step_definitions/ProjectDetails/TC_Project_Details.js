const { client } = require('nightwatch-api');
const { When, Then } = require('cucumber');
const { assert, expect } = require('chai');
const { constants, getSelector, styleCheck, getDomData } = require('../../helpers');

//Global vars
let candName;

Then(/^user sees "([^"]*)" as the project name$/, async (projectName) => {
  const selector = getSelector.sharedComponents.projectDetails.projectName();
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getText(selector, ({ value }) => assert.equal(projectName, value.toUpperCase()));
});

Then(/^user "(sees|clicks)" "(Project Overview|Project Details)" breadcrumb$/, async (action, button) => {
  let selector;
  switch (button) {
    case 'Project Overview':
      selector = getSelector.projectDetails.breadcrumb.projectOverview();
      break;
    case 'Project Details':
      selector = getSelector.projectDetails.breadcrumb.projectDetails();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }

  if (action === 'sees') {
    await client
      .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
      .getText(selector, ({ value }) => assert.equal(button, value));
  } else {
    await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
  }
});

Then(/^user sees the Project Details breadcrumb highlighted$/, async () => {
  const selector = getSelector.projectDetails.breadcrumb.projectDetails();
  const { HIGHLIGHTED_BUTTON } = constants.DESIGN_COLORS.BUTTONS;
  await client.assert.cssProperty(selector, 'background-color', HIGHLIGHTED_BUTTON);
});

Then(/^user clicks browser back button$/, async () => {
  await client.back();
});

Then(/^user clicks Find candidates button from the first unassigned role card$/, async () => {
  const { findCandidatesBtn } = getSelector.projectDetails.hierarchy;
  const foundElements = await getDomData.idsFromElements(findCandidatesBtn());

  if (foundElements.length !== 0) await client.elementIdClick(foundElements[0]);
  else throw new Error('Unnasigned role cards not found!');
});

Then(/^user sees Project Stage section title on Project Details screen$/, async () => {
  const selector = getSelector.sharedComponents.projectStage.projectStageTitle();
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getText(selector, ({ value }) => assert.equal(value, 'Project Stage'));
});

Then(/^user sees "([^"]*)" card containing the stage icon, name and key dates$/, async (stage) => {
  const { defaultCard, stageIcon, stageName, stageDate } = getSelector.sharedComponents.projectStage;
  const foundElements = await getDomData.idsFromElements(defaultCard());

  let cardId;
  for (const element of foundElements) {
    let elementId;
    await client.elementIdElement(element, 'css selector', stageName(), ({ value }) => {
      elementId = value.ELEMENT;
    });
    await client.elementIdText(elementId, ({ value }) => {
      if (value === stage) cardId = element;
    });
    if (cardId) break;
  }
  if (!cardId) throw new Error(`${stage} card not found!`);

  await client.elementIdElement(cardId, 'css selector', stageIcon(), ({ value }) => {
    elementId = value.ELEMENT;
    assert.isDefined(elementId, `Stage icon not found for ${stage}!`);
  });

  await client.elementIdElement(cardId, 'css selector', stageDate(), ({ value }) => {
    elementId = value.ELEMENT;
    assert.isDefined(elementId, `Stage date not found for ${stage}!`);
  });
});

Then(/^user sees the Project team roles for "([^"]*)" stage$/, async (stage) => {
  const { candidateCard, firstLayer, secondLayer, thirdLayer, fourthLayer } = getSelector.projectDetails.hierarchy;
  let teamRoles;
  switch (stage) {
    case 'Opportunity':
      teamRoles = constants.HIERARCHY.BID_AND_OPPORTUNITY;
      break;
    case 'Bid':
      teamRoles = constants.HIERARCHY.BID_AND_OPPORTUNITY;
      break;
    case 'PCSA':
      teamRoles = constants.HIERARCHY.PCSA;
      break;
    case 'Live Projects':
      teamRoles = constants.HIERARCHY.LIVE_PROJECTS;
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }

  const errMsg = `Project team roles for ${stage} stage are not shown correctly!`;
  const promises = [
    styleCheck.checkNestedTextMatching(`${firstLayer()} ${candidateCard()}`, teamRoles.FIRST_LAYER, errMsg),
    styleCheck.checkNestedTextMatching(`${secondLayer()} ${candidateCard()}`, teamRoles.SECOND_LAYER, errMsg),
    styleCheck.checkNestedTextMatching(`${thirdLayer()} ${candidateCard()}`, teamRoles.THIRD_LAYER, errMsg),
  ];
  if (stage === 'PCSA') {
    promises.push(
      styleCheck.checkNestedTextMatching(`${fourthLayer()} ${candidateCard()}`, teamRoles.FOURTH_LAYER, errMsg),
    );
  }
  await Promise.all(promises);
});

Then(/^user sees "([^"]*)" card highlighted$/, async (stage) => {
  const { activeStage, stageName } = getSelector.sharedComponents.projectStage;
  const activeStageValue = `${activeStage()} ${stageName()}`;
  const { HIGHLIGHTED_CARD } = constants.DESIGN_COLORS.CARDS;

  await client
    .waitForElementVisible(activeStage(), constants.SHORT_TIMEOUT)
    .assert.cssProperty(activeStage(), 'background-color', HIGHLIGHTED_CARD)
    .getText(activeStageValue, ({ value }) => expect(value).to.equal(stage));
});

Then(/^user sees ORG Chart legend on Project Details screen$/, async () => {
  const selector = getSelector.projectDetails.orgChartLegend();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user sees "([^"]*)" status name on ORG Chart$/, async (statusName) => {
  const selector = getSelector.projectDetails.orgChartLegendStatusName();
  const foundElements = await getDomData.textFromElements(selector);
  expect(foundElements).to.include(statusName);
});

When(/^user clicks the first "(Confirmed|Awaiting)" role card$/, async (roleStatus) => {
  const { candidateCard, confirmedRole, awaitingRole, candidateName } = getSelector.projectDetails.hierarchy;
  const status = roleStatus === 'Confirmed' ? confirmedRole() : awaitingRole();
  const foundCards = await getDomData.idsFromElements(candidateCard());

  let elementId;
  for (const cardId of foundCards) {
    await client.elementIdElement(cardId, 'css selector', status, ({ value }) => {
      elementId = value.ELEMENT;
    });
    if (elementId) {
      let nameId;
      await client.elementIdElement(cardId, 'css selector', candidateName(), ({ value }) => {
        nameId = value.ELEMENT;
      });
      await client.elementIdText(nameId, ({ value }) => {
        candName = value;
      });
    }
    if (elementId) break;
  }
  if (!elementId) throw new Error(`"${roleStatus}" role cards not found!`);
  await client.moveTo(elementId, 1, 1).mouseButtonClick('left');
});

Then(/^user "(sees|does not see)" Remove from role button on "(Awaiting|Confirmed)" card$/, async (action, card) => {
  const option = card === 'Awaiting' ? 'unconfirmed' : 'confirmed';
  const selector = getSelector.projectDetails.hierarchy.removeFromRoleBtn(option);
  if (action === 'sees') await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  else await client.waitForElementNotPresent(selector, constants.MEDIUM_TIMEOUT);
});

When(/^user clicks Remove from role button on "(Awaiting|Confirmed)" card$/, async (card) => {
  const option = card === 'Awaiting' ? 'unconfirmed' : 'confirmed';
  const selector = getSelector.projectDetails.hierarchy.removeFromRoleBtn(option);
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(/^user sees the person is removed from role$/, async () => {
  if (!candName) throw new Error('No person found to search for!');
  const { candidateCard, candidateName } = getSelector.projectDetails.hierarchy;
  const foundCards = await getDomData.idsFromElements(candidateCard());

  for (const cardId of foundCards) {
    let nameId;
    await client.elementIdElement(cardId, 'css selector', candidateName(), ({ value }) => {
      nameId = value.ELEMENT;
    });
    await client.elementIdText(nameId, ({ value }) => {
      assert.notEqual(value, candName, 'The removed person still found in the hierarchy!');
    });
  }
});

When(/^user clicks off the candidate card$/, async () => {
  const selector = getSelector.projectDetails.title();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(
  /^user "(sees|does not see)" "(Confirm to role|Review Candidates)" button on Awaiting card$/,
  async (action, button) => {
    const { confirmToRoleBtn, reviewCandidatesBtn } = getSelector.projectDetails.hierarchy;
    const selector = button == 'Confirm to role' ? confirmToRoleBtn() : reviewCandidatesBtn();
    if (action === 'sees') await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
    else await client.waitForElementNotPresent(selector, constants.MEDIUM_TIMEOUT);
  },
);

When(/^user clicks "(Confirme to role|Review Candidates)" button on Awaiting card$/, async (button) => {
  const { confirmToRoleBtn, reviewCandidatesBtn } = getSelector.projectDetails.hierarchy;
  const selector = button === 'Confirme to role' ? confirmToRoleBtn() : reviewCandidatesBtn();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(/^user sees the person is confirmed to role$/, async () => {
  if (!candName) throw new Error('No person found to search for!');
  const { candidateCard, candidateName, confirmedRole } = getSelector.projectDetails.hierarchy;
  const foundCards = await getDomData.idsFromElements(candidateCard());

  let nameValue;
  for (const cardId of foundCards) {
    let nameId;
    await client.elementIdElement(cardId, 'css selector', candidateName(), ({ value }) => {
      nameId = value.ELEMENT;
    });

    await client.elementIdText(nameId, ({ value }) => {
      if (value === candName) nameValue = value;
    });

    if (nameValue) {
      await client.elementIdElement(cardId, 'css selector', confirmedRole(), ({ value }) => {
        assert.isDefined(value.ELEMENT, `${candName} is not confirmed to role!`);
      });
      break;
    }
  }
  if (!nameValue) throw new Error(`${candName} not found in the hierarchy!`);
});

When(/^user selects "([^"]*)" project stage$/, async () => {
  const { defaultCard, stageName } = getSelector.sharedComponents.projectStage;
  const foundElements = await getDomData.idsFromElements(defaultCard());

  let cardId;
  for (const element of foundElements) {
    let elementId;
    await client.elementIdElement(element, 'css selector', stageName(), ({ value }) => {
      elementId = value.ELEMENT;
    });
    await client.elementIdText(elementId, ({ value }) => {
      if (value === stage) cardId = element;
    });
    if (cardId) break;
  }
  if (!cardId) throw new Error(`${stage} card not found!`);
  await client.elementIdClick(cardId);
});
