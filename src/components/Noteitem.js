import React, { useContext, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
  const { note,enote,seteNote} = props;
  const context = useContext(noteContext);
  const { editNote, deleteNote } = context;
  const ref = useRef(null);
  const refC = useRef(null);
  const onchange = (e) => {
    seteNote({ ...enote, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    editNote(enote._id,enote.title,enote.description,enote.tag);
    refC.current.click();
    props.showAlert('success','Note updated successfully.!')
  };
  const updateNote = (currentNote) => {
    seteNote({_id:currentNote._id,title:currentNote.title,description:currentNote.description,tag:currentNote.tag})
    ref.current.click();
  };

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <p className="text-end">{note.tag}</p>
            <p className="card-title m-0 p-0 fs-3">{note.title}</p>
            <p className="card-text fs-5 m-0 p-0">{note.description}</p>
            <div className="d-flex justify-content-evenly">
              <button className="btn btn"><i onClick={() => {updateNote(note);}}><EditIcon /></i></button>
              <button className="btn btn"><i onClick={() => {deleteNote(note._id);}}><DeleteIcon /></i></button>
            </div>
            <p className="fs-6 m-0 p-0 text-end">{" "}{new Date(props.note.date).toGMTString()}</p>
          </div>
        </div>
      </div>
      {/* modal toggle button  */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}></button>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-floating">
                <input type="text" className="form-control fs-5 pt-5 pb-3 m-0" id="title" name="title" 
                  value={enote.title} onChange={onchange}/>
                <label className="fs-5" htmlFor="title">Title...</label>
              </div>
            </div>
            <div className="modal-body pt-0">
              <div className="form-floating">
                <textarea className="form-control fs-5 mt-0 mb-3" style={{ minHeight: "330px", paddingTop: "30px" }}
                  name="description" onChange={onchange} value={enote.description} id="description" ></textarea>
                <label className="fs-5" htmlFor="description">Write Here...</label>
              </div>
              <div className="form-floating ">
                <input type="text" className="form-control fs-5 pt-5 pb-3 mt-1  " id="tag" name="tag" 
                  value={enote.tag} onChange={onchange}/>
                <label className="fs-5" htmlFor="tag">Tag</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refC} >Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
