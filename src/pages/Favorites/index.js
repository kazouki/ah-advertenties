import React from "react";

import DisplayCard from "../../components/DisplayCard";
import Navigation from "../../components/Navigation";

export default function Favorites() {
  return (
    <>
      <Navigation />
      <DisplayCard mode={"favorites"} />
    </>
  );
}
