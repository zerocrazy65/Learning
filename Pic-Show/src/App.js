import "./App.css";
import AppHeader from "./components/AppHeader";

import PicItem from "./components/PicItem";
import Pics from "./data/Pics";
import React, { useState } from "react";
import PicPost from "./components/PicPost";
import AppSearch from "./components/AppSearch";

function App() {
  const [selectedPic, setSelectedPic] = useState(null);
  const [searchText, setSearchText] = useState("");

  function onPicClick(thePic) {
    setSelectedPic(thePic);
  }

  function offPicClick() {
    setSelectedPic(null);
  }

  const picElements = Pics.filter((pic) => {
    return pic.title.includes(searchText);
  }).map((pic, index) => {
    return <PicItem key={index} pic={pic} onPic={onPicClick} />;
  });

  let picPost = null;
  if (!!selectedPic) {
    picPost = <PicPost pic={selectedPic} offPic={offPicClick} />;
  }

  return (
    <div className="App">
      <AppHeader />
      <section className="app-section">
        <div className="app-container">
          <AppSearch value={searchText} onValueChange={setSearchText} />
          <div className="app-grid ">{picElements}</div>
        </div>
      </section>
      {picPost}
    </div>
  );
}

export default App;
