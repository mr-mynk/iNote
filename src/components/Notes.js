import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

export const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, addNote, getNotes } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [enote, seteNote] = useState({title:"",description:"",tag:""});
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("success","Your note added successfully.!");
    setNote({title:"",description:"",tag:""});

  };

  return (
    <>
      <h2>New Note</h2>
      <div className="form-floating mb-3">
        <input type="text" className="form-control fs-5 pt-5 pb-3" id="title" name="title" onChange={onchange} value={note.title}/>
        <label className="fs-5" htmlFor="floatingInput" >Title...</label>
      </div>
      <div className="form-floating">
        <textarea className="form-control my-3 fs-5 " style={{ minHeight: "310px", paddingTop: "30px" }} name="description"
          onChange={onchange} id="description" value={note.description}></textarea>
        <label className="fs-5" htmlFor="description">Write Here...</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control fs-5 pt-5 pb-3" id="tag" name="tag" onChange={onchange} value={note.tag}/>
        <label className="fs-5" htmlFor="floatingInput" >Tag</label>
      </div>
      <button type="submit" onClick={handleSave} className="btn btn-success">Add Note</button>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">{notes.length === 0 && "Nothing to display.!"}</div>
        {notes.map((note) => {return <Noteitem key={note._id} note={note} enote={enote} setNote={setNote} seteNote={seteNote} showAlert={props.showAlert}/>;})}
      </div>
    </>
  );
};
