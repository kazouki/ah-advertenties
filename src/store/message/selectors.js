export const selectMessages = (state) => {
  return state.messagesSliceReducer.messageBox.messages;
};

export const selectInboxMessages = (state) => {
  return state.messagesSliceReducer.allInboxMessages;
};
