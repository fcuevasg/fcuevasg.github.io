import React, { useEffect, useState } from "react";

import "./timer.scss";
import playIcon from "./assets/play.svg";
import pauseIcon from "./assets/pause.svg";
import resetIcon from "./assets/reset.svg";
import nextIcon from "./assets/next.svg";
import { TeamMember } from "../interfaces/Interfaces";
import { getFormattedDate, getFormattedTime } from "../../Helpers";

interface timerProps {
  /**Index of the list of people speaking to highlight who's turn */
  index: number;
  setIndex: any;
  members: TeamMember[];
  setMembers: any;
}

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
  } = useTimer(0, props.setIndex, props.index, props.members, props.setMembers, setRedValue, setGreenValue);

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

    let dailyConfig = {
      "dailyStartHours": 9,
      "dailyStartMinutes": 30,
      "dailyDuration": 30,
    };

    const localStorageConfigString = localStorage.getItem("scrumtools-config");

    if (localStorageConfigString && localStorageConfigString?.length > 0) {
      dailyConfig = JSON.parse(localStorageConfigString);
    } else {
      localStorage.setItem("scrumtools-config", JSON.stringify(dailyConfig));
    }

    let dailyEndHours = dailyConfig.dailyStartHours;
    let dailyEndMinutes = dailyConfig.dailyStartMinutes + dailyConfig.dailyDuration;
    if(dailyEndMinutes > 59){
      const extraHours = Math.floor(dailyEndMinutes/60);
      dailyEndHours += extraHours;
      dailyEndMinutes = dailyEndMinutes - (extraHours*60);
    }

    let dailyCloseToEndHours = dailyEndHours;
    let dailyCloseToEndMinutes = dailyEndMinutes - 5;
    if(dailyCloseToEndMinutes < 0) {
      dailyCloseToEndHours--;
      dailyCloseToEndMinutes += 60;
    }

    if (time.getHours() > dailyEndHours || (time.getHours() === dailyEndHours && time.getMinutes() >= dailyEndMinutes)) {
      timeClass = "overTime";
    } else if ((time.getHours() === dailyConfig.dailyStartHours && time.getMinutes() >= dailyConfig.dailyStartMinutes) || (time.getHours() === dailyEndHours && time.getMinutes() < dailyEndMinutes)) {
      if (time.getHours() === dailyCloseToEndHours && time.getMinutes() >= dailyCloseToEndMinutes) {
        timeClass = "closeToEnd";
      } else {
        timeClass = "inTime";
      }
    }

    return timeClass;
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      SetCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
  setMembers: any,
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
        const today: number = parseInt(getFormattedDate(new Date()));

        if (!currentMember.dailyData[today]) {
          currentMember.dailyData[today] = {
            time: 0,
            status: 0,
            emotionalStatus: 0,
          }
        }

        if (currentMember.dailyData[today].time === 0) {
          currentMember.dailyData[today].time = timer;
        } else {
          currentMember.dailyData[today].time += timer;
        }

        setMembers([...members]);
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
