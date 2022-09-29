import React, { useState, useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context= useContext(noteContext);
    const {addnote} = context;

    const [note, setnote] = useState({title: "", description: "", tag: ""})

    const handleSubmit=(e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
        setnote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully", "success")
    }
    const onChange=(e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <div className='container my-3'>
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="form-group my-2">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control my-1" id="title" name="title" placeholder="Enter Title" onChange={onChange} value={note.title} minLength={3} required/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control my-1" id="description" name="description" placeholder="Enter Description" onChange={onChange} value={note.description} minLength={5} required/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control my-1" id="tag" name="tag" placeholder="Enter the Tag" onChange={onChange} value={note.tag} minLength={5} required/>
        </div>
        <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote