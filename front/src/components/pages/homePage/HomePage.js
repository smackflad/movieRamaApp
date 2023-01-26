import "./homePage.css";

import MovieComponent from "./components/movieComponent/MovieComponent";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
  let navigate = useNavigate();

  return (
    <div className="homePage-external">
      <MovieComponent
        id={5}
        title={"The Empire Strikes Back"}
        desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
        nOuser={"Smackflad"}
        nOlikes={5}
        nOHates={3}
        />
    </div>
  );
};

export default HomePage;