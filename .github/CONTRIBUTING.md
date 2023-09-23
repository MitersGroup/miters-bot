# Contributing to Miters Bot

Thank you for your interest in contributing to Miters Bot! By contributing, you are helping to make our project better, and we appreciate your time and effort. This document outlines how you can get involved, what contributions we welcome, and the guidelines you should follow.

## Table of Contents

- [Getting Started](#getting-started)
  - [Setup Project](#setup-project)
  - [Create Issue](#create-issue)
- [Making Contributions](#making-contributions)
  - [Create a New Branch](#create-a-new-branch)
  - [Commit Guidelines](#commit-guidelines)
  - [Code Style](#code-style)
  - [Documentation](#documentation)
- [Submitting a Pull Request](#submitting-a-pull-request)
  - [Pull Request Template](#pull-request-template)
  - [Review Process](#review-process)
- [Community and Communication](#community-and-communication)

## Getting Started

### Setup Project

Following the instructions in the [README.md](README.md) file.

### Create issue

- Make sure there is already existing issue discussing about the feature or bug you are planning to work on.

- If there is no a related issue, please create one before you start your work to avoid redundant work.

## Making Contributions

### Create a New Branch

Before making changes, create a new branch to work on your feature or bug fix:

```bash
git checkout -b [feat|fix|chore|build|docs]/your-update-name
```

### Commit Guidelines

- Follow [semantic commit messages](https://semantic-release.gitbook.io/semantic-release/#commit-message-format) for your commits. Clear and descriptive commit messages are appreciated.

### Code Style

- Maintain consistent code style by following the project's coding conventions and linting rules. Run `npm run lint` to check for linting errors.

- Please run `npm run format-fix` before commit. This command will use `prettier` to format the code.

### Documentation

- Keep code comments and documentation up-to-date. If you introduce new features or make significant changes, update the project's documentation as needed.

## Submitting a Pull Request

### Pull Request Template

When submitting a pull request, please use the provided [PR template](.github/PULL_REQUEST_TEMPLATE.md) to provide essential details about your changes and to help with the review process.

### Review Process

Your pull request will be reviewed by project maintainers. Be prepared to make revisions and address any feedback received during the review process. Once approved, your changes will be merged into the main project.

To speed up the review process and faster approved, make sure your PR is short and obey [SRP](https://en.wikipedia.org/wiki/Single-responsibility_principle).

## Community and Communication

We encourage open and respectful communication within our community. If you have questions, need help, or want to discuss ideas, please feel free to:

- Join our [Discord server](https://discord.gg/miters).
- Create an issue on the GitHub repository.
- Reach out to project maintainers via email or social media.
