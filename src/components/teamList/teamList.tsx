import React, {
  //BaseSyntheticEvent,
  //MouseEventHandler,
  useEffect,
  //useState,
} from "react";
import "./teamList.scss";

import resetIcon from "../timer/assets/reset.svg";
import { DAILYSTATES, TeamMember } from "../interfaces/Interfaces";

interface teamListProps {
  members: TeamMember[];
  setMembers: (members: TeamMember[]) => void;
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
    day = "0" + dd;
  }

  if (mm < 10) {
    month = "0" + mm;
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
  const { members, setMembers } = props;
  useEffect(() => {
    console.log(`members`, members);
  }, [members]);

  let classes = "";

  const warnTime = 120;
  const alertTime = 180;
  let totalDailyTime = 0;

  useEffect(() => {
    localStorage.removeItem("scrumtools-members");
    localStorage.setItem("scrumtools-members", JSON.stringify(members));
  }, [members]);

  const resetDailyTime = (index: number) => {
    members[index].dailyData.time = 0;
    setMembers([...members]);

    // setMembers(JSON.parse(JSON.stringify(members)));
  };

  const nextMemberStatus = (index: number) => {
    members[index].dailyData.status += 1;
    if (members[index].dailyData.status > DAILYSTATES.BLOCKED) {
      members[index].dailyData.status = DAILYSTATES.none;
    }

    setMembers([...members]);
  };

  const setMemberIndex = (index: number) => {
    props.setSpeakingIndex(index);
  };

  const getTotalDailyTimeClass = () => {
    return totalDailyTime > 180 * members.length
      ? "overTime"
      : totalDailyTime > 180 * members.length - 300
      ? "closeToEnd"
      : totalDailyTime > 0
      ? "inTime"
      : "";
  };

  return (
    <div>
      <ul className="listContainer">
        {members &&
          members.map((member, index) => {
            index === props.speakingIndex
              ? (classes = "active listItem")
              : (classes = "listItem");
            index % 2 === 0 ? (classes += " left") : (classes += " right");
            if (members && props.speakingIndex >= members.length)
              props.setSpeakingIndex(0);
            totalDailyTime += member.dailyData.time;

            return (
              <li key={member.name} className={classes}>
                <p
                  className="memberName"
                  onClick={() => {
                    setMemberIndex(index);
                  }}
                >
                  {member.name}
                </p>
                {/* <span className="memberEmail">{member.email}</span> */}
                <p className="memberFlag">
                  <span
                    className="memberFlagIcon"
                    data-status={member.dailyData.status.toString()}
                    onClick={() => {
                      nextMemberStatus(index);
                      console.log(
                        `member.dailyData.status`,
                        member.dailyData.status
                      );
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
                    style={{
                      color:
                        member.dailyData.time >= alertTime
                          ? "rgb(180,0,0)"
                          : member.dailyData.time >= warnTime
                          ? "orange"
                          : "rgb(0,180,0)",
                    }}
                  >
                    {getFormattedTime(member.dailyData.time).replace(/ /g, "")}
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
