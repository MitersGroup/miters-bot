# Miters Discord Bot

An open-source Discord bot for doing everything. The name "Miters" stands for "Malaysian IT-ers".

## Introduction

Miters is a powerful and versatile Discord bot developed in TypeScript using the discord.js library. It is designed to enhance your Discord server management experience with a wide range of features. This repository contains the source code for the Miters Discord bot, and it can be deployed on your server for personal use or community management.

## Installation

To set up the Miters Discord bot on your server, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone git@github.com:yyueniao/miters.git
cd miters
```

2. Install the required dependencies using npm.

```bash
# node v18
# npm v9
npm install
```

3. Create a `.env` file in the root directory of the project and replace `DISCORD_TOKEN` value with your Discord bot token. You can get your token by creating a new bot application on the [Discord Developer Portal](https://discord.com/developers/applications).

```bash
cp .env.example .env
```

4. Enable Privileged Gateway Intents in [Discord Developer Portal](https://discord.com/developers/applications) -> Bot, if `Error('Used disallowed intents')`` is threw.

## Usage

To start the Miters Discord bot, you can use the following script:

```bash
npm run live
# Ready! Logged in as {YOUR_BOT_TAG_ID}
```

This command will compile the TypeScript code using `ts-node` and run the bot in your server. Make sure the bot has been invited to your server before running the command.

## Contributing

We welcome contributions to the Miters Discord bot project! Whether you're an experienced developer or just starting with open-source contributions, we encourage you to get involved. Here are some ways you can contribute:

- **Bug Reports**: If you come across any issues or bugs, please report them on the [issue tracker](https://github.com/yyueniao/miters/issues).

- **Feature Requests**: Have a great idea for a new feature? Share it with us on the [issue tracker](https://github.com/yyueniao/miters/issues).

- **Code Contributions**: If you're comfortable with TypeScript and Discord.js, you can help us by fixing bugs or implementing new features.

Please read more at [Contributing instruction](.github/CONTRIBUTING.md)

- **Documentation**: You can improve the project's documentation, including this README, by submitting pull requests with your updates.

We value and appreciate all contributions, big or small!
