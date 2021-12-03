import React, { useState } from "react";

import "./timer.scss";
import playIcon from "./assets/play.svg";
import pauseIcon from "./assets/pause.svg";
import resetIcon from "./assets/reset.svg";
import nextIcon from "./assets/next.svg";
import { TeamMember } from "../interfaces/Interfaces";

interface timerProps {
  /**Index of the list of people speaking to highlight who's turn */
  index: number;
  setIndex: any;
  members: TeamMember[];
}

const getFormattedTime = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${(minutes as unknown as number) % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

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

export const Timer = (props: timerProps) => {
  
  const [redValue, setRedValue] = useState(0);
  const [greenValue, setGreenValue] = useState(180);
  
  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    handlePrev,
    handleNext,
  } = useTimer(0, props.setIndex, props.index, props.members, setRedValue, setGreenValue);

  const [currentTime, SetCurrentTime] = useState(new Date());

  const formatTime = (timer: number) => {
    const minutes = Math.floor(timer / 60);
    const seconds = parseInt(`${timer % 60}`.slice(-2));

    if (isActive && isPaused && minutes < 3) {
    
      setTimeout(()=>{
        if (seconds > 0 && seconds % 10 === 0)
          turnRedder();
      },1000)
    }

    return getFormattedTime(timer);
  };

  const turnRedder = () => {
    setRedValue(redValue + 10);
    setGreenValue(greenValue - 10);
  };

  const getTimeClass = (time: Date) => {
    let timeClass = "beforeTime";

    if (time.getHours() >= 10) {
      timeClass = "overTime";
    } else if (time.getHours() === 9 && time.getMinutes() >= 30) {
      if (time.getMinutes() >= 55) {
        timeClass = "closeToEnd";
      } else {
        timeClass = "inTime";
      }
    }

    return timeClass;
  };

  setInterval(() => {
    const currentTime = new Date();

    if (currentTime.getSeconds() === 0) {
      SetCurrentTime(new Date());
    }
  }, 1000);

  return (
    <div className="stopWatch-container">
      <div className="stopWatch">
        {/* <h3>Personal time</h3> */}
        <div
          className="stopwatch-card"
          style={{ color: `rgb(${redValue},${greenValue},0)` }}
        >
          <div className={"currentTime " + getTimeClass(currentTime)}>
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <p className="stopWatch__timer">{formatTime(timer)}</p>
          <div className="buttons">
            {!isActive && !isPaused ? (
              <button className="startButton" onClick={handleStart}>
                <img src={playIcon} alt="Play" />
              </button>
            ) : isPaused ? (
              <button className="pauseButton" onClick={handlePause}>
                <img src={pauseIcon} alt="Pause" />
              </button>
            ) : (
              <button className="resumeButton" onClick={handleResume}>
                <img src={playIcon} alt="Resume" />
              </button>
            )}
            <button
              className="resetButton"
              onClick={() => {
                handleReset()
              }}
              disabled={!isActive}
            >
              <img src={resetIcon} alt="Reset" />
            </button>
            <button
              className={"prevButton" + (props.index === 0 ? " disabled" : "")}
              onClick={() => {
                handlePrev()
              }}
            >
              <img src={nextIcon} alt="Prev" />
            </button>
            <button
              className={"nextButton" + (props.index === props.members.length - 1 ? " disabled" : "")}
              onClick={() => {
                handleNext()
              }}
            >
              <img src={nextIcon} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const useTimer = (
  initialState = 0,
  setIndex: any,
  index: number,
  members: any,
  setRedValue: (n:number)=>void,
  setGreenValue: (n:number)=>void
) => {
  const [timer, setTimer] = React.useState(initialState);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const countRef = React.useRef<any>();
  const listContainerEl = document.getElementsByClassName('listContainer')[0];

  const handleStart = () => {
    setIsActive(true);
    handleResume();
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleReset = () => {
    handlePause();
    setIsActive(false);
    setTimer(0);
    setTimeout(() => {
      setRedValue(0);
      setGreenValue(180);
    }, 1000);
  };
  const handlePrev = () => {
    if (index > 0) {

      if (timer > 0) {
        saveMemberTime();
        handleReset();
      }

      setIndex(index - 1);
      
      if (index > 1 && index < members.length - 2 && (members.length - index) % 2 === 0) {
        listContainerEl.scroll({
          top: listContainerEl.scrollTop - 96,
          behavior: 'smooth'
        });
      }

    }
  };
  const handleNext = () => {
    if (index < members.length - 1) {

      if (timer > 0) {
        saveMemberTime();
        handleReset();
      }

      setIndex(index + 1);

      if (index > 1 && index < members.length - 2 && index % 2 === 0) {
        listContainerEl.scroll({
          top: listContainerEl.scrollTop + 96,
          behavior: 'smooth'
        });
      }

    }
  };

  const saveMemberTime = () => {
    const localStorageMembers = localStorage.getItem("scrumtools-members");

    if (localStorageMembers && localStorageMembers?.length > 0) {
      if (members[index]) {
        const currentMember: TeamMember = members[index];
        const today = getFormattedDate(new Date());

        if (currentMember.dailyData.time === 0) {
          currentMember.dailyData.time = timer;
        } else {
          currentMember.dailyData.time += timer;
        }

        localStorage.setItem("scrumtools-members", JSON.stringify(members));
      }
    }
  };

  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    handlePrev,
    handleNext,
  };
};
