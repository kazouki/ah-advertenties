export const selectMessages = (state) => {
  return state.messagesSliceReducer.messageBox.messages;
};

export const selectInboxMessages = (state) => {
  return state.messagesSliceReducer.allInboxMessages;
};

export const selectRemoteUsername = (state) => {
  return state.messagesSliceReducer.remoteUsername;
};
export const selectRemoteUserId = (state) => {
  return state.messagesSliceReducer.id;
};
export const selectUnreadMessages = (state) => {
  return state.messagesSliceReducer.unreadMessages;
};
