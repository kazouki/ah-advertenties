const initialState = {
  messageBox: {
    messages: [
      {
        fromUserId: 1,
        toUserId: 1,
        id: 1,
        text: "geen berichten",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },
};

export default function messagesSliceReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "LOAD_CONVERSATION":
      console.log("payload in LOAD_CONVERSATION ######", payload);
      return {
        ...state,
        messageBox: {
          messages: payload,
        },
      };

    case "LOAD_ALL_USER_MESSAGES":
      return { ...state, allUserMessages: payload };

    case "LOAD_INBOX_MESSAGES":
      return { ...state, allInboxMessages: [...payload] };

    default:
      return state;
  }
}
