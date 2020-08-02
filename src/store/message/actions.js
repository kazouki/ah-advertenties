import api from "../../api";

//TODO fetch card specific user messages
export function fetchConversation({ remoteUserId }) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages/conversation`, {
        method: "POST",
        data: { remoteUserId, userId: getState().user.id },
        jwt: getState().user.token,
      });
      if (res) {
        dispatch({ type: "LOAD_CONVERSATION", payload: res.data });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchRemoteUsernameAndId({ cardOwnerId }) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages/remoteusername`, {
        method: "POST",
        data: { cardOwnerId },
        jwt: getState().user.token,
      });
      if (res) {
        dispatch({ type: "SET_REMOTE_USERNAME_AND_ID", payload: res.data });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

//TODO fetch  messages  ??
// export function fetchAllMessages() {
//   return async function (dispatch, getState) {
//     try {
//       const res = await api(`messages/all`, {
//         method: "POST",
//         data: { userId: getState().user.id },
//         jwt: getState().user.token,
//       });
//       if (res) {
//         dispatch({ type: "LOAD_ALL_USER_MESSAGES", payload: res.data });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
// }

export function fetchInboxMessages() {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages/inbox`, {
        method: "POST",
        data: { userId: getState().user.id },
        jwt: getState().user.token,
      });
      if (res) {
        dispatch({ type: "LOAD_INBOX_MESSAGES", payload: res.data });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function postMessage({ toUserId, text }) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages`, {
        method: "POST",
        data: {
          toUserId,
          text,
          userId: getState().user.id,
        },
        jwt: getState().user.token,
      });
      dispatch(fetchConversation({ remoteUserId: toUserId }));
      dispatch(fetchInboxMessages());
      return res;
    } catch (e) {
      console.log(e);
    }
  };
}

export function messageIsRead({ message, activeUser }) {
  console.log("isRead worked, message is ", message);
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages/isread`, {
        method: "PUT",
        data: {
          ...message,
          isRead: true,
          activeUser,
        },
      });
      if (res) {
        dispatch({ type: "SET_UNREAD_MESSAGES", payload: res.data });
      }
      return res;
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchUnreadMessageCount({ userId }) {
  console.log("fetchUnreadMessageCount worked, userId is ", userId);
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages/allunread`, {
        method: "POST",
        data: {
          userId,
        },
      });
      if (res) {
        console.log("res infetchUnreadMessageCount", res);
        dispatch({ type: "SET_UNREAD_MESSAGES", payload: res.data });
      }
      return res;
    } catch (e) {
      console.log(e);
    }
  };
}
