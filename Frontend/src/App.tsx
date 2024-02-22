import React from "react";
import { getSomeData } from "./appReducer"; // Import the functions from api.js

export default function App() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await getSomeData(); // Call the function from api.js
      console.log(data); // Do something with the data
    } catch (error) {
      console.error(error); // Handle errors
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Hello Everyone</h1>
        <button type="submit">TEST</button>
      </form>
    </div>
  );
}
