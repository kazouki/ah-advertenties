import React from "react";

import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";

export default function Profile() {
  const dispatch = useDispatch();

  return (
    <div>
      profile page ....
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </div>
  );
}
