import { ClientReadyEvent } from "./clientReadyEvents.handler";

const event: ClientReadyEvent = {
  execute: (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};

export default event;
