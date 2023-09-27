/* eslint-disable react/prop-types */
import "../../App.css";
import { FaTrash } from "react-icons/fa";
const SideBar = (props) => {
  const noteElements = props.notes.map((note) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        } p-2 flex justify-between`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet text-lg truncate">
          {note.body.split("\n")[0]}
        </h4>

        <FaTrash
          className={`${
            note.id === props.currentNote.id ? "" : "delete"
          } text-white w-5 h-5`}
          onClick={() => props.hundleDelete(note.id)}
        />
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header py-4">
        <h3>Notes</h3>
        <button className="new-note px-4 py-2" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
};
export default SideBar;
