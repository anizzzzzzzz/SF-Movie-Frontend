import React from 'react';
import './App.css';
import MapLayout from "./component/map/MapLayout";
import FilterData from "./component/filter/FilterData";

function App() {
  return (
      <div className="main-div">
        <FilterData/>
        <MapLayout/>
      </div>
  );
}

export default App;
