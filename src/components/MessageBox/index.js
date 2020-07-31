import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage } from "../../store/appState/selectors";
import { clearMessage } from "../../store/appState/actions";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const showMessage = message !== null;
  if (!showMessage) return null;

  const pos = {
    vertical: "bottom",
    horizontal: "center",
  };
  const { vertical, horizontal } = pos;

  return (
    <Snackbar
      open={showMessage}
      onClose={() => {
        dispatch(clearMessage);
      }}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <MuiAlert elevation={6} severity={message.variant}>
        <b>{message.text}</b>
      </MuiAlert>
    </Snackbar>
  );
}
