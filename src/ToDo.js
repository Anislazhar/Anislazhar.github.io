import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Modal,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import "./ToDo.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ToDo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    // update the todo with new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true },
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>I am a modal</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button onClick={updateTodo}>UPDATE TODO</button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary="Still not Done ✅"
          />
        </ListItem>
        <EditIcon color="primary" onClick={(e) => setOpen(true)}>
          Edit
        </EditIcon>

        <DeleteForeverIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
          variant="contained"
          color="secondary"
        />
      </List>
    </>
  );
}

export default ToDo;
