import React from "react";
import { BrowserRouter } from "react-router-dom";

import NavBarModal from "./components/NavBarModal";


function App() {


  return (
    <BrowserRouter>
      <NavBarModal />
    </BrowserRouter>
  );
}

export default App;
