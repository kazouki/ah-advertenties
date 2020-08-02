import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";

import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// import Home from "./pages/Homepage";
import CardDetail from "./pages/CardDetail";
import NewCard from "./pages/NewCard";
import Messages from "./pages/Messages";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { selectUser } from "./store/user/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

import { fetchCards } from "./store/card/actions";

import Paperbase from "./theme/Paperbase";
import DndLayout from "./components/Editor/dndLayout";
import "typeface-roboto";
import { AH_BLUE } from "./config/constants.js";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    dispatch(fetchCards());
  }, [dispatch, user.id]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Paperbase LayoutComponent={DndLayout} bg={AH_BLUE} />
          )}
        />

        {/* <Route
          path="/carddetail/:id"
          component={() => (
            <Paperbase LayoutComponent={CardDetail} bg={AH_BLUE} />
          )}
        /> */}
        <Route path="/carddetail/:id" component={CardDetail} />
        <Route path="/messages/all/:remoteIdFromModal" component={Messages} />
        <Route path="/messages/all" component={Messages} />

        <Route path="/newcard" component={NewCard} />
        <Route path="/signup" component={SignUp} bg={AH_BLUE} />
        {/* <Route
          path="/login"
          component={() => <Paperbase LayoutComponent={Login} bg={"white"} />}
        /> */}
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
