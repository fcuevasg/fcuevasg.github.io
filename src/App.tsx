import React, { useState } from "react";
import "./App.scss";
import { Timer } from "./components/timer";
import { TeamList } from "./components/teamList";
import { PrimeDirective } from "./components/primeDirective/primeDirective";

function App() {
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const pd =
    "Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand. --Norm Kerth";
  return (
    <div className="App">
      <PrimeDirective content={pd}></PrimeDirective>
      <div>
        
        <ul>
          <li>What I did</li>
          <li>What I am going to do</li>
          <li>What it's blocked</li>
        </ul>
      </div>
      <Timer index={speakingIndex} setIndex={setSpeakingIndex} />
      <TeamList
        members={[
          "Mike",
          "Carles",
          "Javi",
          "Yon",
          "Luismi",
          "Fran",
          "Ale",
          "Diego",
          "Jesús",
        ]}
        speakingIndex={speakingIndex}
        setSpeakingIndex={setSpeakingIndex}
      ></TeamList>

    
    </div>
  );
}

export default App;
