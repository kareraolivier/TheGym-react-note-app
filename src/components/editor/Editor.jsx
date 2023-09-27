/* eslint-disable react/prop-types */
import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "../../App.css";
export default function Editor({ tempNoteText, setTempNoteText }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section id={1} className="pt-2 w-4/5 h-screen overflow-y-auto">
      <ReactMde
        value={tempNoteText}
        onChange={setTempNoteText}
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
