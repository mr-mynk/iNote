import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  const getNotes = async () => {
    const response = await fetch(`${host}/userNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
    // console.log("notes fetched from database")
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json);
    // eslint-disable-next-line
    const note = json;
    getNotes();
    // console.log("note added to database");
  };

  const editNote = async (_id,title,description,tag) => {
    
    const response = await fetch(`${host}/updateNote/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    // eslint-disable-next-line
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === _id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
      // console.log("note edited to backend");
    }  
    getNotes();
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken":
          localStorage.getItem('token'),
      },
    });
    const json = response.json();
    // console.log(json);
    
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    getNotes();
    props.showAlert('success','Note deletd successfully.!')
    // console.log("note deleted from noteState:- " + id);
  };
  return (
    <noteContext.Provider
      value={{ notes, getNotes, setNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
