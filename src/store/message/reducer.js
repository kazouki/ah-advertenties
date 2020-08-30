const initialState = {
  messageBox: {
    messages: [],
  },
};

export default function messagesSliceReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "LOAD_CONVERSATION":
      const sortedByDate = payload.sort(
        (a, b) => a.createdAt.split("T")[0] - b.createdAt.split("T")[0]
      );

      return {
        ...state,
        messageBox: {
          messages: sortedByDate.reverse(),
        },
      };
    case "RESET_REMOTE_USERNAME_AND_ID":
      const newState = state;
      delete newState.remoteUsername;
      delete newState.id;
      return { ...state, ...newState };

    case "SET_REMOTE_USERNAME_AND_ID":
      return { ...state, remoteUsername: payload.name, id: payload.id };

    case "SET_REMOTE_USERNAME":
      return { ...state, remoteUsername: payload.name };
    case "SET_UNREAD_MESSAGES":
      return { ...state, ...payload };

    case "LOAD_ALL_USER_MESSAGES":
      return { ...state, allUserMessages: payload };

    case "LOAD_INBOX_MESSAGES":
      return { ...state, allInboxMessages: [...payload] };

    default:
      return state;
  }
}
