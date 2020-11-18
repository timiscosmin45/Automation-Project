const { client } = require('nightwatch-api');
const { When, Then } = require('cucumber');
const { assert, expect } = require('chai');
const { constants, getSelector, styleCheck, getDomData } = require('../../helpers');

//Global vars
let candName;

Then(/^user sees "([^"]*)" as the project name$/, async (projectName) => {
  const selector = getSelector.sharedComponents.projctDetails.projectName();
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getText(selector, ({ value }) => assert.equal(projectName, value));
});

Then(/^user "(sees|clicks)" "(Project Overview|Project Details)" breadcrumb$/, async (action, button) => {
  let selector;
  switch (button) {
    case 'Project Overview':
      selector = getSelector.projectDetails.projectOverviewBreadcrumb();
      break;
    case 'Project Details':
      selector = getSelector.projectDetails.projectDetailsBreadcrumb();
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
  const breadcrumbSelector = getSelector.projectDetails.projectDetailsBreadcrumb();
  const { HIGHLIGHTED_BUTTON } = constants.DESIGN_COLORS.BUTTONS;

  await client.assert.cssProperty(breadcrumbSelector, 'background-color', HIGHLIGHTED_BUTTON);
});

Then(/^user clicks browser back button$/, async () => {
  await client.back();
});

Then(/^user clicks Find Candidates button on Project Details screen$/, async () => {
  const selector = getSelector.projectDetails.hierarchy.findCandidatesBtn();
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .assert.containsText(selector, 'Find candidates')
    .click(selector);
});

Then(/^user sees Project Stage section title on Project Details screen$/, async () => {
  const selector = getSelector.projectDetails.projectStageTitle();
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getText(selector, ({ value }) => assert.equal(value, 'Project Stage'));
});

Then(/^user sees "([^"]*)" card containing the status icon, name and key dates$/, async (stage) => {
  const stageIcon = getSelector.sharedComponents.projectStage.stageIcon();
  const stageCard = getSelector.sharedComponents.projectStage.defaultCard();
  const stageName = getSelector.sharedComponents.projectStage.stageName();
  const stageDates = getSelector.sharedComponents.projectStage.stageDates();
  const foundCards = await getDomData.idsFromElements(stageCard);
  let cardId;
  let elementId;
  for (const card of foundCards) {
    await client.elementIdElement(card, 'css selector', stageName, ({ value }) => {
      elementId = value.ELEMENT;
    });
    await client.elementIdText(elementId, ({ value }) => {
      if (value === stage) cardId = elementId;
    });
  }
  if (!cardId) throw new Error(`${stage} card not found!`);
  await client.elementIdElement(cardId, 'css selector', stageIcon, ({ value }) => {
    elementId = value.ELEMENT;
  });
  await client.elementIdDisplayed(elementId, ({ value }) => {
    assert.ok(value, `${stage} icon is not displayed!`);
  });
  await client.elementIdElement(cardId, 'css selector', stageDates, ({ value }) => {
    elementId = value.ELEMENT;
  });
  await client.elementIdDisplayed(elementId, ({ value }) => {
    assert.ok(value, `${stage} dates are not displayed!`);
  });
});

Then(/^user sees the Project team roles for "([^"]*)" stage$/, async (stage) => {
  const { firstLayer, secondLayer, thiredLayer, fourthLayer } = getSelector.projectDetails.hierarchy;
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
    styleCheck.checkNestedTextMatching(firstLayer(), teamRoles.FIRST_LAYER, errMsg),
    styleCheck.checkNestedTextMatching(secondLayer(), teamRoles.SECOND_LAYER, errMsg),
    styleCheck.checkNestedTextMatching(thiredLayer(), teamRoles.THIRD_LAYER, errMsg),
  ];
  if (stage === 'Live Projects') {
    promises.push(styleCheck.checkNestedTextMatching(fourthLayer(), teamRoles.FOURTH_LAYER, errMsg));
  }
  await Promise.all(promises);
});

Then(/^user sees "([^"]*)" card highlighted$/, async (stage) => {
  const stageCard = getSelector.sharedComponents.projectStage.activeCard();
  const stageIcon = getSelector.sharedComponents.projectStage.stageIcon();
  const stageName = getSelector.sharedComponents.projectStage.stageName();
  const stageDates = getSelector.sharedComponents.projectStage.stageDates();
  const { HIGHLIGHTED_CARD } = constants.DESIGN_COLORS.CARDS;
  const cardElement = getDomData.idFromElement(stageCard);
  let elementId;
  await client.elementIdElement(cardElement, 'css selector', stageName, ({ value }) => {
    elementId = value.ELEMENT;
  });
  await client.elementIdText(elementId, ({ value }) => {
    assert.equal(value, stage);
  });
  await client.elementIdElement(cardElement, 'css selector', stageIcon, ({ value }) => {
    elementId = value.ELEMENT;
  });
  await client.elementIdDisplayed(elementId, ({ value }) => {
    assert.ok(value, `${stage} icon is not displayed!`);
  });
  await client.elementIdElement(cardElement, 'css selector', stageDates, ({ value }) => {
    elementId = value.ELEMENT;
  });
  await client.elementIdDisplayed(elementId, ({ value }) => {
    assert.ok(value, `${stage} dates are not displayed!`);
  });
  await client
    .waitForElementVisible(stageCard, constants.SHORT_TIMEOUT)
    .assert.cssProperty(stageCard, 'background-color', HIGHLIGHTED_CARD);
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
  console.log(candName);
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
