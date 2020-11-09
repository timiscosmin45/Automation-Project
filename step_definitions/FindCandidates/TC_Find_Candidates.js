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
  const selector = getSelector.findCandidates.shortlist.slot();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  const foundElements = await getDomData.idsFromElements(selector);
  const slotsNumber = foundElements.length;
  await client.assert.strictEqual(slotsNumber, 4, '4 empty shortlist slots were not found!');
});

Then(/^user sees the "([^"]*)" displayed as "([^"]*)" on Find Candidates screen$/, async (pageElement, data) => {
  let elementSelector;
  switch (pageElement) {
    case 'title':
      elementSelector = getSelector.findCandidates.shortlist.title();
      break;
    case 'date and label':
      elementSelector = getSelector.findCandidates.shortlist.dateAndLabel();
      break;
    case 'explainer text':
      elementSelector = getSelector.findCandidates.shortlist.explainerText();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementVisible(elementSelector, constants.MEDIUM_TIMEOUT);
  await client.getText(elementSelector, ({ value }) =>
    assert.equal(value, data, `${pageElement} did not match the expected ${data}!`),
  );
});

Then(
  /^user "(sees|clicks)" the "([^"]*)" button from the first card of "(suitable candidates|options)" list$/,
  async (action, button, list) => {
    let buttonSelector;
    let candidateSelector;
    if (list === 'suitable candidates') candidateSelector = getSelector.findCandidates.candidate();
    else candidateSelector = getSelector.findCandidates.shortlist.shortlistCandidate();
    switch (button) {
      case 'Add to options list':
        buttonSelector = getSelector.findCandidates.candidateFooter.addToOptionListBtn();
        break;
      case 'See more details':
        buttonSelector = getSelector.findCandidates.candidateFooter.seeDetailsBtn();
        break;
      case 'Remove from shortlist':
        buttonSelector = getSelector.findCandidates.shortlist.removeBtn();
        break;
      case 'Suggest Candidate':
        buttonSelector = getSelector.findCandidates.shortlist.suggestCandidateBtn();
        break;
      default:
        throw new Error('Incorrect case inputted!');
    }
    const foundElements = await getDomData.idsFromElements(candidateSelector);
    let elementId;
    let found;
    await client.elementIdElement(foundElements[0], 'css selector', buttonSelector, ({ value }) => {
      elementId = value.ELEMENT;
    });
    await client.elementIdText(elementId, ({ value }) => {
      found = value === button;
    });
    if (!found) throw new Error(`${button} button was not found!`);
    if (action === 'clicks') await client.elementIdClick(elementId);
  },
);

Then(
  /^user sees the selected candidate added to the "(first|second|third|fourth)" space in the shortlist$/,
  async (slotNumber) => {
    const candidateSelector = getSelector.findCandidates.shortlist.shortlistCandidate();
    const candidateName = getSelector.findCandidates.candidateName();
    const candidateIcon = getSelector.findCandidates.candidateIcon();
    const foundElements = await getDomData.idsFromElements(candidateSelector);
    const shortListLength = foundElements.length;
    let desirableShortlistLength;

    switch (slotNumber) {
      case 'first':
        desirableShortlistLength = 1;
        break;
      case 'second':
        desirableShortlistLength = 2;
        break;
      case 'third':
        desirableShortlistLength = 3;
        break;
      case 'fourth':
        desirableShortlistLength = 4;
        break;
      default:
        throw new Error('Incorrect case inputted!');
    }
    if (shortListLength === desirableShortlistLength) {
      await client.elementIdElement(
        foundElements[desirableShortlistLength - 1],
        'css selector',
        candidateName,
        ({ value }) => {
          const elementId = value.ELEMENT;
          assert.isDefined(elementId, 'The name of the candidate is not displayed');
        },
      );
      await client.elementIdElement(foundElements[0], 'css selector', candidateIcon, ({ value }) => {
        const elementId = value.ELEMENT;
        assert.isDefined(elementId, 'The photo of the candidate is not displayed');
      });
    } else if (shortListLength > desirableShortlistLength)
      throw new Error(`There are more than ${desirableShortlistLength} candidates on shortlist!`);
    else throw new Error('Candidate was not added to shortlist');
  },
);

Then(/^user sees Reorder list buttons from the first card of the shortlist "(enabled|disabled)"$/, async (option) => {
  const candidateSelector = getSelector.findCandidates.shortlist.shortlistCandidate();
  const reorderSelectors = [
    getSelector.findCandidates.shortlist.reorderList.moveUpBtn(),
    getSelector.findCandidates.shortlist.reorderList.moveDownBtn(),
  ];
  const foundElements = await getDomData.idsFromElements(candidateSelector);
  let isEnabled;
  if (option === 'enabled') isEnabled = true;
  else isEnabled = false;
  for (let selector in reorderSelectors) {
    let elementId;
    await client.elementIdElement(foundElements[0], 'css selector', selector, ({ value }) => {
      elementId = value.ELEMENT;
    });
    await client.elementIdEnabled(elementId, ({ value }) => {
      assert.equal(value, isEnabled, `Reorder list buttons are not ${option}!`);
    });
  }
});

Then(/^user sees the shortlist populated, but not full$/, async () => {
  const candidateSelector = getSelector.findCandidates.shortlist.shortlistCandidate();
  const foundElements = await getDomData.idsFromElements(candidateSelector);
  const shortListLength = foundElements.length;
  await client.assert
    .isAtLeast(shortListLength, 1, 'Shortlist is empty!')
    .isBelow(shortListLength, 4, 'Shortlist is full');
});

Then(/^user does not see the candidate on candidates list$/, async () => {
  const candidatesList = getSelector.findCandidates.candidate();
  const shortlist = getSelector.findCandidates.shortlist.shortlistCandidate();
  const candidateNameSelector = getSelector.findCandidates.candidateName();
  const foundCandListElements = await getDomData.idsFromElements(candidatesList);
  const foundShortlistElements = await getDomData.idsFromElements(shortlist);
  const shortListLength = foundShortlistElements.length;
  let candidateName;
  let elementId;
  await client.elementIdElement(
    foundShortlistElements[shortListLength - 1],
    'css selector',
    candidateNameSelector,
    ({ value }) => {
      elementId = value.ELEMENT;
    },
  );
  await client.elementIdText(elementId, ({ value }) => {
    candidateName = value;
  });
  for (const element in foundCandListElements) {
    await client.elementIdElement(element, 'css selector', candidateNameSelector, ({ value }) => {
      elementId = value.ELEMENT;
    });
    await client.elementIdText(elementId, ({ value }) => {
      assert.notEqual(value, candidateName, 'The candidate is still present on candidates list!');
    });
  }
});

Then(/^user adds canddidates until shortlist is full$/, async () => {
  const candidatesList = getSelector.findCandidates.candidate();
  const shortlist = getSelector.findCandidates.shortlist.shortlistCandidate();
  const foundCandListElements = await getDomData.idsFromElements(candidatesList);
  const foundShortlistElements = await getDomData.idsFromElements(shortlist);
  const nedeedCandidatesNumber = 4 - foundShortlistElements.length;
  const addOptionBtn = getSelector.findCandidates.candidateFooter.addToOptionListBtn();
  for (let i = 0; i < nedeedCandidatesNumber; i++) {
    let found;
    let elementId;
    await client.elementIdElement(foundCandListElements[0], 'css selector', addOptionBtn, ({ value }) => {
      elementId = value.ELEMENT;
    });
    await client.elementIdText(elementId, ({ value }) => {
      found = value === 'Add to options list';
    });
    if (!found) throw new Error('Add to options list button was not found!');
    await client.elementIdClick(elementId);
  }
});

Then(/^user sees all Add to options list buttons disabled on candidates list$/, async () => {
  const candidatesList = getSelector.findCandidates.candidate();
  const foundCandListElements = await getDomData.idsFromElements(candidatesList);
  const addOptionBtn = getSelector.findCandidates.candidateFooter.addToOptionListBtn();
  let elementId;
  for (let element in foundCandListElements) {
    await client.elementIdElement(element, 'css selector', addOptionBtn, ({ value }) => {
      elementId = value.ELEMENT;
    });
    await client.elementIdEnabled(elementId, ({ value }) => {
      assert.isFalse(value, 'Add to options list buttons are not disabled!');
    });
  }
});
