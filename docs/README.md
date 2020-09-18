# LOR automation testing

## How to prepare the automated tests and how to execute them

The name of the feature branch will be something like **feature/FB-LORxxxx-name-of-feature**. The FB comes from 'feature branch', and is intended to make the branching strategy a bit more clear, enabling distinction between feature branches and their story branches (their children). The feature from JIRA will be reflected in the LORxxxx.

Then, from the feature branch, we need to create story branches, for each story that the developers are working on and which can have a corresponding automated test associated with the story.
The name of a story branch will be something like **feature/SB-LORxxxx-name-of-story**. The SB comes from 'story branch', and it means that the branch is a child of a 'feature branch', which in turn is for the feature LORxxxx from JIRA.

Other types of branches can be created for special cases. They don't need to follow the branching strategy if they are not part of a feature:

- HOTFIX-name-of-hotfix --> To fix something wrong in our code. Normally small and urgent fixes.
- REFACTOR-name-of-refactor --> To clean or tidy up our code.
- IMPROVE-name-of-improvement --> To add some functionality to our code.
- MERGE-name-of-merge --> To merge branches.

##Executing the automated tests on your local machine :

```bash
$ npm run e2e-test
```
