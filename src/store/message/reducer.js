const initialState = {
  messageBox: {
    messages: [
      {
        fromUserId: 1,
        toUserId: 1,
        id: 1,
        text: "kies een gesprek in de inbox ...",
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

      // function payloadSwitch() {
      //   if (!payload) {
      //     return ["2020-01-01T", "2020-01-02T"];
      //   }
      //   return payload;
      // }

      const sortedByDate = payload.sort(
        (a, b) => a.createdAt.split("T")[0] - b.createdAt.split("T")[0]
      );
      console.log("sortedByDate in LOAD_CONVERSATION ######", sortedByDate);

      return {
        ...state,
        messageBox: {
          messages: sortedByDate.reverse(),
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
