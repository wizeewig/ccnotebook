import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {

    const context= useContext(noteContext);
    const { note, updateNote } = props;
    const {deletenote} = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deletenote(note._id);  props.showAlert("Deleted Successfully", "success")}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem