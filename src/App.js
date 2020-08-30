import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Loading from "./components/Loading";

import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import CardDetail from "./pages/CardDetail";
import NewCard from "./pages/NewCard";
import Messages from "./pages/Messages";
import Favorites from "./pages/Favorites";
import MyCards from "./pages/MyCards";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { selectUser } from "./store/user/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

import { fetchCards } from "./store/card/actions";
import { fetchUserFavCards } from "./store/card/actions";

import Paperbase from "./theme/Paperbase";
import DndLayout from "./components/Editor/dndLayout";
import "typeface-roboto";
import { AH_BLUE } from "./config/constants.js";

// import Split from "react-split";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    dispatch(fetchCards());
    if (user.id) dispatch(fetchUserFavCards(user.id));
  }, [dispatch, user.id]);

  return (
    <div className="App">
      {/* <Split sizes={[100, 100]}> */}

      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Paperbase LayoutComponent={DndLayout} bg={AH_BLUE} />
          )}
        />

        <Route path="/carddetail/:id" component={CardDetail} />
        <Route path="/messages/all/:remoteIdFromModal" component={Messages} />
        <Route path="/messages/all" component={Messages} />

        <Route path="/newcard" component={NewCard} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/mycards" component={MyCards} />
        <Route path="/signup" component={SignUp} bg={AH_BLUE} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
      {/* </Split> */}

      {isLoading ? <Loading /> : null}
      <MessageBox />
    </div>
  );
}

export default App;
