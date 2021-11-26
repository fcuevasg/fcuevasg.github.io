import React, {
  BaseSyntheticEvent,
  //MouseEventHandler,
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
 

  useEffect(() => {
    localStorage.removeItem("members");

    localStorage.setItem("members", JSON.stringify(props.members));
    console.log(`props.members`, props.members);
  }, [props.members]);

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
            <li key={member} className={classes}>
              <p className="memberName">{member}</p>
             
            </li>
          );
        })}
      
    </ul>
  );
};
