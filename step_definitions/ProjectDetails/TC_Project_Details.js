const { client } = require('nightwatch-api');
const { When, Then } = require('cucumber');
const { assert, expect } = require('chai');
const { constants, getSelector, styleCheck, getDomData } = require('../../helpers');

//Global vars
let candName;

Then(/^user sees "([^"]*)" as the project name$/, async (projectName) => {
  const selector = getSelector.projectDetails.projectName();
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

Then(/^user sees "([^"]*)" on Projects Details screen$/, async (projectData) => {
  let selector;
  switch (projectData) {
    case 'project name':
      selector = getSelector.projectDetails.projectName();
      break;
    case 'client name':
      selector = getSelector.projectDetails.clientName();
      break;
    case 'status':
      selector = getSelector.projectDetails.status();
      break;
    case 'sector':
      selector = getSelector.projectDetails.sector();
      break;
    case 'value':
      selector = getSelector.projectDetails.value();
      break;
    case 'location':
      selector = getSelector.projectDetails.location();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user clicks Find Candidates button on Project Details screen$/, async () => {
  const selector = getSelector.projectDetails.findCandidatesBtn();
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
  let stageIcon;
  let stageCard;
  let stageName;
  let stageDates;
  switch (stage) {
    case 'Opportunity':
      stageCard = getSelector.projectDetails.projectStage.opportunityCard();
      stageIcon = getSelector.projectDetails.projectStage.opportunityIcon();
      stageName = getSelector.projectDetails.projectStage.opportunityName();
      stageDates = getSelector.projectDetails.projectStage.opportunityDates();
      break;
    case 'Bid':
      stageCard = getSelector.projectDetails.projectStage.bidCard();
      stageIcon = getSelector.projectDetails.projectStage.bidIcon();
      stageName = getSelector.projectDetails.projectStage.bidName();
      stageDates = getSelector.projectDetails.projectStage.bidDates();
      break;
    case 'PCSA':
      stageCard = getSelector.projectDetails.projectStage.pcsaCard();
      stageIcon = getSelector.projectDetails.projectStage.pcsaIcon();
      stageName = getSelector.projectDetails.projectStage.pcsaName();
      stageDates = getSelector.projectDetails.projectStage.pcsaDates();
      break;
    case 'Live':
      stageCard = getSelector.projectDetails.projectStage.liveCard();
      stageIcon = getSelector.projectDetails.projectStage.liveIcon();
      stageName = getSelector.projectDetails.projectStage.liveName();
      stageDates = getSelector.projectDetails.projectStage.liveDates();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client
    .waitForElementVisible(stageCard, constants.SHORT_TIMEOUT)
    .waitForElementVisible(stageIcon, constants.SHORT_TIMEOUT)
    .waitForElementVisible(stageName, constants.SHORT_TIMEOUT)
    .getText(stageName, ({ value }) => assert.equal(value, stage))
    .waitForElementVisible(stageDates, constants.SHORT_TIMEOUT);
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
  let stageCard;
  const { HIGHLIGHTED_CARD } = constants.DESIGN_COLORS.CARDS;
  switch (stage) {
    case 'Opportunity':
      stageCard = getSelector.projectDetails.projectStage.opportunityCard();
      break;
    case 'Bid':
      stageCard = getSelector.projectDetails.projectStage.bidCard();
      break;
    case 'PCSA':
      stageCard = getSelector.projectDetails.projectStage.pcsaCard();
      break;
    case 'Live':
      stageCard = getSelector.projectDetails.projectStage.liveCard();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
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
