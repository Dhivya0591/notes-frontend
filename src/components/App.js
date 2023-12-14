import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import InputArea from "./InputArea";
import axios from "axios";
import ModifyNote from "./ModifyNote";
function App() {
  const [notes, setNotes] = useState([]);
  const [showModify, setShowModify] = useState(false);
  const [modifyNoteId, setModifyNoteId] = useState("");

  useEffect(() => {
    // Fetch existing notes when the component mounts
    axios
      .get("https://dhivya-notes-backend.onrender.com/api/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error(error));
  }, []);

  function addNote(newNote) {
    axios
      .post("https://dhivya-notes-backend.onrender.com/api/notes", newNote)
      .then((response) => setNotes([...notes, response.data]))
      .catch((error) => console.error(error));
  }

  function deleteNote(id) {
    // Get the note ID from the array
    const noteId = id;

    // Send a DELETE request to remove the note from the backend
    axios
      .delete(`https://dhivya-notes-backend.onrender.com/api/notes/${noteId}`)
      .then(() => setNotes(notes.filter((note) => note._id !== id)))
      .catch((error) => console.error(error));
  }

  function modifyNote(id) {
    setShowModify(true);
    setModifyNoteId(id);
  }

  function onCancel() {
    setShowModify(false);
  }

  function onSave(id, title, content) {
    const noteId = id;

    axios
      .put(`https://dhivya-notes-backend.onrender.com/api/notes/${noteId}`, {
        title,
        content,
      })
      .then((response) => {
        setNotes(
          notes.map((note) => {
            if (note._id === id) {
              return { ...note, title: title, content: content };
            }
          })
        );
        setShowModify(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <Header />
      <InputArea onAdd={addNote} />
      {showModify && (
        <ModifyNote id={modifyNoteId} onCancel={onCancel} onSave={onSave} />
      )}
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onModify={modifyNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
