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

const respObj = {
  toDos: [
    {
      _id: "64fcb1042f258d9163d3181a",
      task: "editedtodo",
      completed: false,
      __v: 0,
    },
    {
      _id: "64fcb174dd4fff0d3090a2d4",
      task: "First entry",
      completed: false,
      __v: 0,
    },
    {
      _id: "64fcb1a2dd4fff0d3090a2d6",
      task: "First entry",
      completed: false,
      __v: 0,
    },
    {
      _id: "64fcb1c1a1b46f40241406b5",
      task: "First entry",
      completed: false,
      __v: 0,
    },
    {
      _id: "64fcb266a1b46f40241406b9",
      task: "First srentry",
      completed: false,
      __v: 0,
    },
    {
      _id: "64fcb2ea43fc3065fd4eace2",
      task: "fist denti",
      completed: true,
      __v: 0,
    },
  ],
};
