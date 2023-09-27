/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Split from "react-split";
// import { nanoid } from "nanoid";
import Sidebar from "../sidebar/SideBar";
import Editor from "../editor/Editor";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, db } from "../../../Firebase";
import "../../App.css";

const Home = () => {
  //adding notes to firebase
  const [notes, setNotes] = useState([]);
  const [tempNoteText, setTempNoteText] = useState("");
  //adding notes to local storage

  // const [notes, setNotes] = useState(
  //   () => JSON.parse(localStorage.getItem("notes")) || []
  // );
  const [currentNoteId, setCurrentNoteId] = useState("");

  //finding current note local storage.
  // const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  //sorting the notes
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  //storing notes on local storage
  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  //storing notes on firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);
  //creating new notes on local storage
  // function createNewNote() {
  //   const newNote = {
  //     id: nanoid(),
  //     body: "# Write notes here",
  //   };
  //   setNotes((prevNotes) => [newNote, ...prevNotes]);
  //   setCurrentNoteId(newNote.id);
  // }
  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);
  //create notes on firebase
  async function createNewNote() {
    const newNote = {
      body: "# Write notes here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  //update data in fire base
  async function updateNote(text) {
    try {
      if (currentNoteId) {
        const docRef = doc(db, "notes", currentNoteId);
        await setDoc(
          docRef,
          { body: text, updatedAt: Date.now() },
          { merge: true }
        );
      } else {
        console.error("Invalid currentNoteId:", currentNoteId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  /**
   * Create an effect that runs any time the tempNoteText changes
   * Delay the sending of the request to Firebase
   *  uses setTimeout
   * use clearTimeout to cancel the timeout
   */

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote?.body) {
        updateNote(tempNoteText);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [tempNoteText]);

  //Update note in local storage

  // function updateNote(text) {

  //   //HERE WE ARE ALSO PUTTING THE NOT WE UPDATED AT THE TOP
  //   setNotes((oldNotes) => {
  //     const newArray = [];
  //     for (let i = 0; i < oldNotes.length; i++) {
  //       const oldNote = oldNotes[i];
  //       if (oldNote.id === currentNoteId) {
  //         newArray.unshift({ ...oldNote, body: text });
  //       } else {
  //         newArray.push(oldNote);
  //       }
  //     }
  //     return newArray;
  //   });

  //   //HERE WE WERE MAPPING THE NOT BUT MAP ALWAYS FOLLOW THE ORDER. IT CAN NOT PUT THE ONE WE UPDATED AT THE TOP
  //   // setNotes((oldNotes) =>
  //   //   oldNotes.map((oldNote) => {
  //   //     return oldNote.id === currentNoteId
  //   //       ? { ...oldNote, body: text }
  //   //       : oldNote;
  //   //   })
  //   // );
  // }

  //function to delete note in local storage
  // const hundleDelete = (event, noteId) => {
  //   event.stopPropagation();
  //   setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  // };

  //function to delete note in firebase
  async function hundleDelete(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="flex">
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            hundleDelete={hundleDelete}
          />

          <Editor
            tempNoteText={tempNoteText}
            setTempNoteText={setTempNoteText}
          />
        </Split>
      ) : (
        <div className="no-notes">
          <h1 className=" py-5 font-bold text-2xl text-shadow-lg text-[#0081c1]">
            Welcome to your noteapp, have no notes
          </h1>
          <button
            className="first-note text-xl px-4 hover:shadow-lg font-semibold"
            onClick={createNewNote}
          >
            Create note now
          </button>
        </div>
      )}
    </main>
  );
};
export default Home;
