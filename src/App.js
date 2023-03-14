import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  const startHandler = () => {
    setDuration(parseInt(seconds, 10) + 60 * parseInt(minutes, 10));
    // setMinutes(60 * 5);
    // setSeconds(0);
    setIsRunning(true);
  };
  const stopHandler = () => {
    if (isStop) setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const resumeHandler = () => {
    let newDuration = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, duration]);

  // const [minutes, setMinutes] = useState('00');
  // const [seconds, setSeconds] = useState('00');
  // const [isStart, setIsStart] = useState(false);
  // const [timmerId, setTimmerId] = useState(null);

  // const START_DURATION = 10;

  // const deadline = new Date().getTime() + minutes * seconds * 1000;
  // const startClock = () => {
  //   if (minutes === 0 && seconds === 0) {
  //     return;
  //   }

  //   const time = deadline - Date.now();

  //   setMinutes(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) || 0);
  //   setSeconds(Math.floor((time % (1000 * 60)) / 1000) || 0);
  // };

  // const reset = () => {
  //   setIsStart(isStart);

  //   // clearInterval(timmerId);
  //   setMinutes(0);
  //   setSeconds(0);
  // };
  // useEffect(() => {
  //   if (isStart) {
  //     const timmerId = setInterval(() => startClock(deadline), 1000);
  //     setTimmerId(timmerId);
  //   } else {
  //     clearInterval(timmerId);
  //   }
  // }, [isStart]);

  // const startImmer = () => {
  //   setIsStart(!isStart);
  //   // if (isStart) {
  //   //   const timerId = setInterval(() => tick(), 1000);
  //   //   setTimmerId(timerId);
  //   // } else {
  //   //   clearInterval(timmerId);
  //   // }
  // };

  return (
    <div className="App">
      Minutes{' '}
      <input
        type="text"
        name="minutes"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      Seconds{' '}
      <input
        type="text"
        name="seconds"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />
      <button onClick={startHandler}>start</button>
      <button
        onClick={stopHandler}
        className="btn btn-danger btn-lg inline me-3"
      >
        STOP
      </button>
      <button
        onClick={resumeHandler}
        className="btn btn-success btn-lg inline me-3"
      >
        RESUME
      </button>
      <button onClick={resetHandler}>Reset</button>
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </div>
  );
}

export default App;
