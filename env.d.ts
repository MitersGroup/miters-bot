export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      TESTING_GUILD_ID: string;
      CLIENT_ID: string;
      ANONYMOUS_APPROVAL_CHANNEL_ID: string;
      ANONYMOUS_POST_CHANNEL_ID: string;
      PREFIX: string;
      FEEDBACK_CHANNEL_ID: string;
    }
  }
}
