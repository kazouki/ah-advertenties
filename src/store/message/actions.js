import api from "../../api";

export function fetchMessages({ cardOwnerId }) {
  return async function (dispatch, getState) {
    try {
      const res = await api(`messages`, {
        method: "POST",
        data: { cardOwnerId, userId: getState().user.id },
        jwt: getState().user.token,
      });
      dispatch({ type: "LOAD_MESSAGES", payload: res.data });
    } catch (e) {
      console.log(e);
    }
  };
}
