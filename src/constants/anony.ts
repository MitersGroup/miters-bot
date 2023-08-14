const ANONY_CONSTANTS = {
  name: "anony",
  description: "Test command. Will submit a message anonymously.",
  subCommandTitleName: "title",
  subCommandTitleDescription: "Title for the post",
  subCommandMessageName: "message",
  subCommandMessageDescription: "Message to be sent as anonymously",
  contentLabel: "Content",
  defaultColorCode: 0x0000ff,
  approvedColorCode: 0x00ff00,
  rejectedColorCode: 0xff0000,
  approveEmoji: "✅",
  rejectEmoji: "❎",
} as const;

export default ANONY_CONSTANTS;
