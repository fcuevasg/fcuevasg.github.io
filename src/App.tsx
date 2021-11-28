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
  const [newMember, setnewMember] = useState("");

  const addMember = () => {
    if (newMember !== "") {

      const newMemberData = {
        name: newMember
      };

      localStorage.setItem("scrumtools-members", JSON.stringify([...members, newMemberData]));

      setMembers([...members, newMemberData]);
    }
  };
  const handleKeyPress = (event: any) => {
    if (event.code === "NumpadEnter" || event.code === "Enter") addMember();
  };
  return (
    <div className="App">
      <Timer index={speakingIndex} setIndex={setSpeakingIndex} members={members} />
      <div className="daily-script">
        <ul className="daily-script__list">
          <li className="daily-script__list_item">What I did last day</li>
          <li className="daily-script__list_item">What I am going to do today</li>
          <li className="daily-script__list_item">I have (not) blockers</li>
          <li className="daily-script__list_item">I think AC & SP for my task are (not) OK</li>
        </ul>
      </div>
      <div className="memberList">
        <h3 className="members-title">Members</h3>
        <button className="editButton" onClick={() => setIsEditMode(!isEditMode)}>
          {" "}
          {!isEditMode ? "Edit" : "Save"}
        </button>
        {!isEditMode ? (
          <TeamList
            members={members}
            setMembers={setMembers}
            speakingIndex={speakingIndex}
            setSpeakingIndex={setSpeakingIndex}
          ></TeamList>
        ) : (
          <div>
            <div className="generate-members">
              <button
                className="generate-members__button"
                onClick={generatePandoraMembers}
              >
                Generate Pandora members
              </button>
            </div>
            <li className="listItem inputMember">
              <div className="form-field__control">
                <input
                  className="form-field__input"
                  type={"text"}
                  value={newMember}
                  onChange={(event) => setnewMember(event.target.value)}
                  placeholder="New member's name"
                  onKeyDown={handleKeyPress}
                />
              </div>
              <button className="addMember" onClick={addMember}>
                +
              </button>
            </li>
            <GridLayoutResizable TeamMembers={members} setMembers={setMembers} />
          </div>
        )}
      </div>
      <PrimeDirective content={pd} author="--Norm Kerth"></PrimeDirective>
    </div>
  );
}

export default App;

function generatePandoraMembers() {
  const scrumToolsMembers = [
    {
      name: "Chao",
      email: "chao.hu@alten.es",
    },
    {
      name: "Mike",
      email: "miguel.garciac@alten.es",
    },
    {
      name: "Javi",
      email: "franciscoj.cuevas@alten.es",
    },
    {
      name: "Yon",
      email: "yon.cuadrado@alten.es",
    },
    {
      name: "Luismi",
      email: "luism.rambla@alten.es",
    },
    {
      name: "Fran",
      email: "fjose.cruz@alten.es",
    },
    {
      name: "Ale",
      email: "alejandro.hidalgo@alten.es",
    },
    {
      name: "Diego",
      email: "diego.ortegav@alten.es",
    },
    {
      name: "Jesús",
      email: "jesusm.guzman@alten.es",
    },
    {
      name: "Martin",
      email: "martin.sollenberg@se.abb.com",
    },
  ];
  localStorage.setItem("scrumtools-members", JSON.stringify(scrumToolsMembers));
}

function getMembersFromLocalStorage(): any[] {

  const localStorageMembers = localStorage.getItem("scrumtools-members");

  if (localStorageMembers && localStorageMembers?.length > 0) {
    return JSON.parse(localStorageMembers);
  }

  return [];

}
