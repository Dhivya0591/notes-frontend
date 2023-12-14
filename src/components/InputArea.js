import React, { useState } from "react";

function InputArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <div>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Add title.."
          className="input-title"
        />
      </div>
      <div>
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Add body..."
          className="input-body"
        />
        <button className="add-button" onClick={submitNote}>
          Add Note
        </button>
      </div>
    </div>
  );
}

export default InputArea;
