import React, {
  BaseSyntheticEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import "./teamList.scss";

interface teamListProps {
  members: string[];
  setMembers?: any;
  speakingIndex: number;
  setSpeakingIndex: any;
}

export const TeamList = (props: teamListProps): React.ReactElement => {
  let classes = "";
  const [newMember, setnewMember] = useState("");

  const addMember = () => {
    if (newMember !== "") {
      localStorage.setItem(
        "members",
        JSON.stringify([...props.members, newMember])
      );

      props.setMembers([...props.members, newMember]);
    }
  };

  useEffect(() => {
    localStorage.removeItem("members");

    localStorage.setItem("members", JSON.stringify(props.members));
    console.log(`props.members`, props.members);
  }, [props.members]);

  const removeMember = (event: BaseSyntheticEvent) => {
    const target = event.currentTarget.innerHTML;
    props.setMembers(
      props.members.filter((memb) => {
        return memb !== target;
      })
    );
  };

  const handleKeyPress = (event: any) => {
    if (event.code === "NumpadEnter" || event.code === "Enter") addMember();
  };

  return (
    <ul className="listContainer">
      {props.members &&
        props.members.map((member, index) => {
          index === props.speakingIndex
            ? (classes = "active listItem")
            : (classes = "listItem");
          index % 2 === 0 ? (classes += " left") : (classes += " right");
          if (props.members && props.speakingIndex >= props.members.length)
            props.setSpeakingIndex(0);
          return (
            <li key={member} className={classes} onClick={removeMember}>
              {member}
            </li>
          );
        })}
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
    </ul>
  );
};
