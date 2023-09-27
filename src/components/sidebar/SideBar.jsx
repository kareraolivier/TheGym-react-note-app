/* eslint-disable react/prop-types */
import "../../App.css";
const SideBar = (props) => {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        } p-2`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet text-lg">Note {index + 1}</h4>
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
