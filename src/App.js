import React from "react";
import Paperbase from "./theme/Paperbase";
import { BrowserRouter } from "react-router-dom";

// Roboto font required by material-ui
import "typeface-roboto";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Paperbase />
      </BrowserRouter>
    </div>
  );
}

export default App;
