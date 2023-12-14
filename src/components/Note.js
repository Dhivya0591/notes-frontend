import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  function handleModify() {
    props.onModify(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="delete-button" onClick={handleClick}>
        DELETE
      </button>
      <button className="delete-button" onClick={handleModify}>
        MODIFY
      </button>
    </div>
  );
}

export default Note;
