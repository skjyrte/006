import React from "react";
import "./App.css";
import "./Background/Background";
import Background from "./Background/Background";
import Container from "./Container/Container";

function App() {
  return (
    <>
      <Background />
      <Container taskObj={taskList} />
    </>
  );
}

export default App;

const taskList = [
  "Jog around the park 3x",
  "Complete online JavaScript course",
  "10 minute meditation",
  "Read for 1 hour",
  "Pick up groceries",
  "Complete Todo App on Frontend Mentor",
];
