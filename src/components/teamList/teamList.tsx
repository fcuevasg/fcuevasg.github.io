import React, {
  //BaseSyntheticEvent,
  //MouseEventHandler,
  useEffect,
  //useState,
} from "react";
import "./teamList.scss";

import resetIcon from "../timer/assets/reset.svg";

interface teamListProps {
  members: any[];
  setMembers?: any;
  speakingIndex: number;
  setSpeakingIndex: any;
}

const getFormattedDate = (date: Date) => {

  let dd = date.getDate();
  let mm = date.getMonth() + 1;

  const yyyy = date.getFullYear();

  let day = dd.toString();
  let month = mm.toString();

  if (dd < 10) {
    day = '0' + dd;
  }

  if (mm < 10) {
    month = '0' + mm;
  }

  return yyyy + month + day;
};

const getFormattedTime = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${(minutes as unknown as number) % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const TeamList = (props: teamListProps): React.ReactElement => {
  let classes = "";
 

  useEffect(() => {
    localStorage.removeItem("scrumtools-members");

    localStorage.setItem("scrumtools-members", JSON.stringify(props.members));
    console.log(`props.members`, props.members);
  }, [props.members]);

  const today = getFormattedDate(new Date());
  const warnTime = 120;
  const alertTime = 180;

  const resetDailyTime = (index: number) => {
    props.members[index].dailyData[today] = 0;
    localStorage.setItem("scrumtools-members", JSON.stringify(props.members));
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
            <li key={member.name} className={classes}>
              <p className="memberName">{member.name}</p>
              {/* <span className="memberEmail">{member.email}</span> */}
              {member.dailyData && member.dailyData[today] ? (
                <p className="memberTime">
                  <button className="resetDailyTime" onClick={()=>{resetDailyTime(index)}}><img src={resetIcon} alt="Reset" /></button>
                  <span style={{"color": member.dailyData[today] >= alertTime ? "red" : ( member.dailyData[today] >= warnTime ? "orange" : "green" )}}>
                    {getFormattedTime(member.dailyData[today]).replace(/ /g,'')}
                  </span>
                </p>
              ):(
                <p className="memberTime empty">00:00:00</p>
              )}
            </li>
          );
        })}
      
    </ul>
  );
};
