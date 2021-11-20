import React, { useState } from "react";
import "./App.scss";
import { Timer } from "./components/timer";
import { TeamList } from "./components/teamList";
import { PrimeDirective } from "./components/primeDirective/primeDirective";
import { GridLayoutResizable } from "./components/gridLayout";

function App() {
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [members, setMembers] = useState(getMembersFromLocalStorage());
  const [isEditMode, setIsEditMode] = useState(false);

  const pd = ` Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand. `;

  return (
    <div className="App">
      <Timer index={speakingIndex} setIndex={setSpeakingIndex} />
      <div className="daily-script">
        <ul className="daily-script__list">
          <li className="daily-script__list_item">What I did last day</li>
          <li className="daily-script__list_item">
            What I am going to do today
          </li>
          <li className="daily-script__list_item">I have (not) blockers</li>
        </ul>
      </div>
      <button className="editButton"onClick={() => setIsEditMode(!isEditMode)}> {(!isEditMode)? "Edit mode":"Save"}</button>
      {!isEditMode ? (
        <TeamList
          members={members}
          setMembers={setMembers}
          speakingIndex={speakingIndex}
          setSpeakingIndex={setSpeakingIndex}
        ></TeamList>
      ) : (
        <GridLayoutResizable TeamMembers={members} setMembers={setMembers} />
      )}
      <div className="generate-members">
        <button
          className="generate-members__button"
          onClick={generateRandomMembers}
        >
          Generate Pandora members
        </button>
      </div>
      <PrimeDirective content={pd} author="--Norm Kerth"></PrimeDirective>
    </div>
  );
}

export default App;

function generateRandomMembers() {
  const mocked = [
    "Mike",
    "Carles",
    "Javi",
    "Yon",
    "Luismi",
    "Fran",
    "Ale",
    "Diego",
    "Jesús",
  ];
  localStorage.setItem("members", JSON.stringify(mocked));
}

function getMembersFromLocalStorage(): string[] {
  const localStorageMembers = localStorage.getItem("members");

  if (localStorageMembers && localStorageMembers?.length > 0) {
    return JSON.parse(localStorageMembers);
  }

  return [];
}
/*
 */
