import React, { useState } from "react";
import Cube from "./Cube";
import Cylinder from "./Cylinder";
import Sphere from "./Sphere";
import "./App.css";

function App() {
  // Initializes state for the shape dimension using the useState hook
  const [shapeDimension, setShapeDimension] = useState(Math.random());

  // Defines the handleRandomize function that sets a new random shape dimension
  const handleRandomize = () => {
    setShapeDimension(Math.random());
  };

  // Renders the components for the Cylinder, Sphere, and Cube with the current shape dimension
  // Passes the shape dimension as a prop to each component
  return (
    <div className="main">
      <div className="container">
        <Cylinder height={shapeDimension} radius={shapeDimension} />
        <Sphere radius={shapeDimension} />
        <Cube width={shapeDimension} />
      </div>
      // Render a button that triggers the handleRandomize function when clicked
      <button onClick={handleRandomize}>Randomize Shape</button>
    </div>
  );
}

export default App;
