const initialState = {
  messageBox: {
    messages: {
      fromUserId: null,
      toUserId: null,
      id: null,
      text: "",
      createdAt: "",
      updatedAt: "",
    },
  },
};

export default function messagesSliceReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "LOAD_MESSAGES":
      console.log("LOAD_MESSAGES worked");
      return {
        ...state,
        messageBox: {
          messages: payload,
        },
      };

    default:
      return state;
  }
}
