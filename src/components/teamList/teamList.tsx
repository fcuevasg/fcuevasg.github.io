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
  }, [props.members]);

  const today = getFormattedDate(new Date());
  const warnTime = 120;
  const alertTime = 180;

  const resetDailyTime = (index: number) => {
    props.members[index].dailyData[today].time = 0;
  };

  const nextMemberStatus = (index: number) => {

    if (!props.members[index].dailyData) {
      props.members[index].dailyData = {};
    }
    
    if (!props.members[index].dailyData[today]) {
      props.members[index].dailyData[today] = {status: 0};
    }

    if (!props.members[index].dailyData[today].status) {
      props.members[index].dailyData[today].status = 0;
    }

    props.members[index].dailyData[today].status += 1;

    if (props.members[index].dailyData[today].status > 3) {
      props.members[index].dailyData[today].status = 0;
    }

  };

  const setMemberIndex = (index: number) => {
    props.setSpeakingIndex(index);
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
              <p className="memberName" onClick={()=>{setMemberIndex(index)}}>{member.name}</p>
              {/* <span className="memberEmail">{member.email}</span> */}
              <p className="memberFlag">
                <span className="memberFlagIcon" data-status={member.dailyData && member.dailyData[today] && member.dailyData[today].status ? member.dailyData[today].status.toString() : "0"} onClick={()=>{nextMemberStatus(index)}}></span>
              </p>
              {member.dailyData && member.dailyData[today] && member.dailyData[today].time ? (
                <p className="memberTime">
                  <button className="resetDailyTime" onClick={()=>{resetDailyTime(index)}}><img src={resetIcon} alt="Reset" /></button>
                  <span style={{"color": member.dailyData[today].time >= alertTime ? "rgb(180,0,0);" : ( member.dailyData[today].time >= warnTime ? "orange" : "rgb(0,180,0);" )}}>
                    {getFormattedTime(member.dailyData[today].time).replace(/ /g,'')}
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
