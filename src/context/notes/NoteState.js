import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props)=>{
    
  const host= "http://localhost:5000"
    const notesInitial= []

      const [notes, setnotes] = useState(notesInitial)


      //Get all Notes
      const getnotes= async (title, description, tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json(); 
        setnotes(json)
      }

      //Add a Note
      const addnote= async (title, description, tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag}) 
        });
        const note = await response.json();
        setnotes(notes.concat(note))
      }

      //Delete a Note
      const deletenote= async(id)=>{
         //API call
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
        });
        const json = await response.json(); 
        console.log(json);
        const newNotes= notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes)
      }

      //Edit a Note
      const editnote= async (id, title, description, tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag}) 
        });
        const json = await response.json(); 
        console.log(json);
        
        let newNotes= JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setnotes(newNotes)
      }


    return (
        <NoteContext.Provider value={{notes, addnote, deletenote, editnote, getnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;