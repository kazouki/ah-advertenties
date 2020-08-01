export const selectMessages = (state) => {
  return state.messagesSliceReducer.messageBox.messages;
};

export const selectInboxMessages = (state) => {
  return state.messagesSliceReducer.allInboxMessages;
};

export const selectRemoteUsername = (state) => {
  return state.messagesSliceReducer.remoteUsername;
};
