import Axios from "axios";
import React, { useState } from "react";
import "./App.css";
import RecipeTile from "./components/RecipeTile";

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`;

  async function getRecipes() {
    const result = await Axios.get(url);
    setRecipes(result.data.hits);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <div className="app">
      <h1>Food Recipes Plaza</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          type="text"
          className="app__input"
          placeholder="enter ingridient"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input type="submit" className="app__submit" value="Search" />
      </form>
      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default App;
