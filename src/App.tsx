import React, { useState } from "react";
import "./App.scss";
import { Timer } from "./components/timer";
import { TeamList } from "./components/teamList";
import { PrimeDirective } from "./components/primeDirective/primeDirective";

function App() {
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [members, setMembers] = useState(getMembersFromLocalStorage());
  const pd = ` Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand. `;

  return (
    <div className="App">
      <Timer index={speakingIndex} setIndex={setSpeakingIndex} />
      <TeamList
        members={members}
        setMembers={setMembers}
        speakingIndex={speakingIndex}
        setSpeakingIndex={setSpeakingIndex}
      ></TeamList>
      <div>
        <ul>
          <li>What I did</li>
          <li>What I am going to do</li>
          <li>What it's (not) blocked</li>
        </ul>
      </div>

      <PrimeDirective content={pd} author="--Norm Kerth"></PrimeDirective>
      <button onClick={generateRandomMembers}>generate members</button>
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

  return []
}
/*
 */
