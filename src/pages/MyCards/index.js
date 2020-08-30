import React from "react";

import DisplayCard from "../../components/DisplayCard";
import Navigation from "../../components/Navigation";

export default function MyCards() {
  return (
    <>
      <Navigation />
      <DisplayCard mode={"myCards"} />
    </>
  );
}
