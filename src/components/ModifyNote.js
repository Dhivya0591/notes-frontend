import React, { useState } from "react";

function ModifyNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function handleCancel() {
    props.onCancel();
  }

  function handleSave() {
    props.onSave(props.id, note.title, note.content);
  }
  return (
    <div className="modify-note">
      <div>
        <div>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Add title.."
            className="modify-title"
          />
        </div>
        <div>
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Add body..."
            className="modify-body"
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          SAVE
        </button>
        <button className="save-button" onClick={handleCancel}>
          CANCEL
        </button>
      </div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default ModifyNote;
