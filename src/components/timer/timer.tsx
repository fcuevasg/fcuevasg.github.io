import React from "react";

import "./timer.scss"
import playIcon from './assets/play.svg';
import pauseIcon from './assets/pause.svg';
import resetIcon from './assets/reset.svg';
import nextIcon from './assets/next.svg';

const formatTime = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes as unknown as number % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};


interface timerProps{
    /**Index of the list of people speaking to highlight who's turn */
    index:number,
    setIndex:any
}

export const Timer = (props:timerProps) => {
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
  } = useTimer(0,props.setIndex,props.index);

  return (
    <div className="stopWatch-container">
      <div className="stopWatch">
        {/* <h3>Personal time</h3> */}
        <div className="stopwatch-card">
          <p className="stopWatch__timer">{formatTime(timer)}</p>
          <div className="buttons">
            {!isActive && !isPaused ? (
              <button className="startButton" onClick={handleStart}><img src={playIcon} alt="Play" /></button>
            ) : isPaused ? (
              <button className="pauseButton" onClick={handlePause}><img src={pauseIcon} alt="Pause" /></button>
            ) : (
              <button className="resumeButton"onClick={handleResume}><img src={playIcon} alt="Resume" /></button>
            )}
            <button className="resetButton" onClick={handleReset} disabled={!isActive}>
              <img src={resetIcon} alt="Reset" />
            </button>
            <button className="prevButton" onClick={handlePrev}><img src={nextIcon} alt="Prev" /></button>
            <button className="nextButton" onClick={handleNext}><img src={nextIcon} alt="Next" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const useTimer = (initialState = 0, setIndex:any,index:number) => {
  const [timer, setTimer] = React.useState(initialState);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const countRef = React.useRef<any>();

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };
  const handlePrev = ()=>{
    if(index > 0) setIndex(index -1)
  }
  const handleNext = ()=>{
    setIndex(index +1)
  }

  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    handlePrev,
    handleNext
  };
};
