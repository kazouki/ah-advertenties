import api from "../../api";

export function fetchConversation({ remoteUserId }) {
  return async function (dispatch, getState) {
    if (remoteUserId) {
      try {
        const res = await api(`messages/conversation`, {
          method: "POST",
          data: { remoteUserId, userId: getState().user.id },
          jwt: getState().user.token,
        });
        if (res) {
          dispatch({ type: "LOAD_CONVERSATION", payload: res.data });
          return res;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return null;
  };
}

export function fetchRemoteUsernameAndId({ cardId }) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages/remoteusername`, {
        method: "POST",
        data: { cardId },
        jwt: getState().user.token,
      });
      if (res) {
        dispatch({ type: "SET_REMOTE_USERNAME_AND_ID", payload: res.data });
        return res;
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };
}

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
        return res;
      }
    } catch (e) {
      console.log(e);
    }
    return null;
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
    return null;
  };
}

export function messageIsRead({ message, activeUser }) {
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
        return res;
      }
      return res;
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchUnreadMessageCount({ userId }) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages/allunread`, {
        method: "POST",
        data: {
          userId,
        },
      });
      if (res) {
        dispatch({ type: "SET_UNREAD_MESSAGES", payload: res.data });
        return res;
      }
      return res;
    } catch (e) {
      console.log(e);
    }
    return null;
  };
}
