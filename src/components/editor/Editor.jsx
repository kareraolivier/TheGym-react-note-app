/* eslint-disable react/prop-types */
import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "../../App.css";
export default function Editor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pt-2 w-4/5 h-screen overflow-y-auto">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={90}
        heightUnits="vh"
      />
    </section>
  );
}
