export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      TESTING_GUILD_ID: string;
    }
  }
}
