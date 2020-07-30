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
    case "LOAD_MESSAGES":
      console.log("payload in LOAD_MESSAGES ######", payload);
      return {
        ...state,
        messageBox: {
          messages: payload.reverse(),
        },
      };

    default:
      return state;
  }
}
