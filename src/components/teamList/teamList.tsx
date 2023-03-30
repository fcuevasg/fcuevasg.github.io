import React, {
  //BaseSyntheticEvent,
  //MouseEventHandler,
  useEffect,
  //useState,
} from "react";
import "./teamList.scss";

import resetIcon from "../timer/assets/reset.svg";
import { DAILYSTATES, TeamMember } from "../interfaces/Interfaces";
import { getFormattedDate, getFormattedTime } from "../../Helpers";

interface teamListProps {
  members: TeamMember[];
  setMembers: (members: TeamMember[]) => void;
  speakingIndex: number;
  setSpeakingIndex: any;
}

export const TeamList = (props: teamListProps): React.ReactElement => {
  const { members, setMembers } = props;

  let listItemClasses = "";
  let totalDailyTime = 0;

  const today: number = parseInt(getFormattedDate(new Date()));

  const warnTime = 120;
  const alertTime = 180;
  const closeToEndTime = 300;

  useEffect(() => {
    console.log(`members`, members);
    localStorage.removeItem("scrumtools-members");
    localStorage.setItem("scrumtools-members", JSON.stringify(members));
  }, [members]);

  const resetDailyTime = (index: number) => {
    members[index].dailyData[today].time = 0;
    setMembers([...members]);
  };

  const nextMemberStatus = (index: number) => {

    if (!members[index].dailyData[today]) {
      members[index].dailyData = {
        [today]: { status: 0, time: 0 }
      };
    }

    members[index].dailyData[today].status += 1;
    if (members[index].dailyData[today].status > DAILYSTATES.BLOCKED) {
      members[index].dailyData[today].status = DAILYSTATES.none;
    }

    setMembers([...members]);
  };

  const getTotalDailyTimeClass = () => {
    return totalDailyTime > alertTime * members.length
      ? "overTime"
      : totalDailyTime > alertTime * members.length - closeToEndTime
        ? "closeToEnd"
        : totalDailyTime > 0
          ? "inTime"
          : "";
  };

  const getMemberTimeClass = (member: TeamMember) => {

    if (!member.dailyData[today] || member.dailyData[today].time === 0)
      return "";

    return member.dailyData[today].time >= alertTime
      ? "overTime"
      : member.dailyData[today].time >= warnTime
        ? "closeToEnd"
        : "inTime";
  };

  const getMemberTodayTime = (member: TeamMember) => {

    let memberTodayTime = 0;

    if (member.dailyData[today])
      memberTodayTime = member.dailyData[today].time || 0;

    return getFormattedTime(memberTodayTime).replace(/ /g, "");
  }

  return (
    <div>
      <ul className="listContainer">
        {members &&
          members.map((member, index) => {
            index === props.speakingIndex
              ? (listItemClasses = "active listItem")
              : (listItemClasses = "listItem");
            index % 2 === 0 ? (listItemClasses += " left") : (listItemClasses += " right");
            if (members && props.speakingIndex >= members.length)
              props.setSpeakingIndex(0);

            if (!member.dailyData)
              member.dailyData = {
                [today]: { status: 0, time: 0 }
              };

            if (member.dailyData[today] && member.dailyData[today].time)
              totalDailyTime += member.dailyData[today].time;

            return (
              <li key={member.name} className={listItemClasses}>
                <p
                  className="memberName"
                  onClick={() => {
                    props.setSpeakingIndex(index);
                  }}
                >
                  {member.name}
                </p>
                {/* <span className="memberEmail">{member.email}</span> */}
                <p className="memberFlag">
                  <span
                    className="memberFlagIcon"
                    data-status={member.dailyData[today] ? member.dailyData[today].status ? member.dailyData[today].status.toString() : "0" : "0"}
                    onClick={() => {
                      nextMemberStatus(index);
                    }}
                  ></span>
                </p>

                <p className="memberTime">
                  <button
                    className="resetDailyTime"
                    onClick={() => {
                      resetDailyTime(index);
                    }}
                  >
                    <img src={resetIcon} alt="Reset" />
                  </button>
                  <span
                    className={getMemberTimeClass(member)}
                  >
                    {getMemberTodayTime(member)}
                  </span>
                </p>
              </li>
            );
          })}
      </ul>
      <div className="totalDailyTime">
        <h4>Total daily time:</h4>
        <span className={"totalDailyTimeValue " + getTotalDailyTimeClass()}>
          {getFormattedTime(totalDailyTime).replace(/ /g, "")}
        </span>
      </div>
    </div>
  );
};
