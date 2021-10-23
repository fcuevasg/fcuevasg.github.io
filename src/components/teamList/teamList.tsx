import React from "react";
import "./teamList.scss"

interface teamListProps {
  members: string[];
  speakingIndex: number;
  setSpeakingIndex:any
}

export const TeamList = (props: teamListProps): React.ReactElement => {
    let classes ="";
    return (
    <ul className="listContainer">
      {props.members.map((member, index) => {
          (index === props.speakingIndex) ? classes = "active listItem" : classes = "listItem";
          if(props.speakingIndex >= props.members.length) props.setSpeakingIndex(0);
       return ( <li key={member} className={classes}>{member}</li>);
      })}
    </ul>
  );
};
