import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";

import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login/index";

// import Home from "./pages/Homepage";
// import ArtworkDetail from "./pages/ArtworkDetail";
import NewCard from "./pages/NewCard";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

import Paperbase from "./theme/Paperbase";
import "typeface-roboto";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Paperbase} />
        {/* <Route path="/artworks/:id" component={ArtworkDetail} /> */}
        <Route path="/newcard" component={NewCard} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

//#####################################################################

// import React from "react";
// import Paperbase from "./theme/Paperbase";
// import { BrowserRouter } from "react-router-dom";

// import Navigation from "./components/Navigation";
// import Loading from "./components/Loading";
// import MessageBox from "./components/MessageBox";

// // Roboto font required by material-ui
// import "typeface-roboto";

// function App() {
//   return (
//     <div>
//       {/* {isLoading ? <Loading /> : null} */}
//       <BrowserRouter>
//         <Navigation />
//         <MessageBox />
//         <Paperbase />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
