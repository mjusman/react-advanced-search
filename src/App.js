import React from "react";
import SearchPage from "./components/SearchPage";
import { data } from "./sample_data/data";
import './App.css';
import Header from "./components/Header";


const App = props => {
  return (
    <>
     <Header/>
    <div id="app">
      <SearchPage books={data} />
    </div>
    </>
  );
}

export default App;