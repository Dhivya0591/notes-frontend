import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import InputArea from "./InputArea";
import axios from "axios";
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

  return (
    <div>
      <Header />
      <InputArea onAdd={addNote} />

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
