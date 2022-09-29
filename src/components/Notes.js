import React, {useContext, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes(props) {

    const context= useContext(noteContext);
    const {notes, getnotes, editnote} = context;
    const navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
      getnotes();
    }
      // eslint-disable-next-line
      else{
        navigate('/login')
      }
    })
    
    const ref = useRef(null)
    const refCLose= useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleSubmit = (e)=>{
        e.preventDefault(); 
        editnote(note.id, note.etitle, note.edescription, note.etag)
        refCLose.current.click();
        props.showAlert("Updated Successfully", "success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
     {/* <AddNote/>

      <button type="button" className="btn btn-primary d-none" data-toggle="modal" ref={ref} data-target="#exampleModal">
        Launch demo modal
      </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" ref={ref} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className='my-3'>
                  <div className="form-group my-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter Title" value={note.etitle} onChange={onChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter Description" value={note.edescription} onChange={onChange}/>
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter the Tag" value={note.etag} onChange={onChange}/>
                  </div>
                  </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit} >Update Note</button>
              </div>
            </div>
          </div>
        </div>
    <div className='row my-3'>
          <h2>Your Notes</h2>
          {notes.map((note)=>{
            return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
          })}
      </div> */}
      <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refCLose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleSubmit} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className='container'> 
                  {notes.length===0 && "No notes to dislplay"} 
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
    </>
  )
}

export default Notes