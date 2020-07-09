import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import db from "./firebase";
import ToDo from "./ToDo";
import firebase from "firebase";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // when the app loads, we need  to listen to the database and fetch new todo list as they get  added/remove

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo })),
        );
      });
  }, []);

  const addToDo = (event) => {
    event.preventDefault(); // Will stop refreching after submit by a from
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // to take to input in time order
    });
    // setTodos([...todos, input]); // add new todo from th input
    setInput(""); // clear up the input after clicking add todo button
  };

  return (
    <div className="App">
      <h1>Vinnie To Do App</h1>
      <form>
        <FormControl>
          <InputLabel>Write a ToDo </InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addToDo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <ToDo todo={todo} />
          //<li>todo</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
