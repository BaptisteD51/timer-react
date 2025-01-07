import { useState, useEffect, useContext } from "react"
import Timer from "./Timer"
import { Timers } from "../contexts/Timers"
import { FaPlay, FaPause } from "react-icons/fa"

function Track() {
  let { timers, updateTimers } = useContext(Timers)

  // Switch between running and edit mode
  let [isRunning, updateIsRunning] = useState(false)

  // Pause the timer
  let [pause, updatePause] = useState(false)

  // An interval fire each second
  useEffect(() => {
    let countDown = setInterval(() => {
      if (isRunning && !pause) {
        let updatedTimers = [...timers]
        let runningTimerIndex = updatedTimers.findIndex(
          (timer) => timer.running
        )
        if (runningTimerIndex != -1) {
          updatedTimers[runningTimerIndex].current++
          if (
            updatedTimers[runningTimerIndex].current >=
            updatedTimers[runningTimerIndex].duration
          ) {
            if (runningTimerIndex < updatedTimers.length - 1) {
              updatedTimers[runningTimerIndex].running = false
              updatedTimers[runningTimerIndex + 1].running = true
            } else {
              updatedTimers = resetTimers(updatedTimers)
              updateIsRunning(false)
            }
          }
        } else {
          updatedTimers[0].running = true
          updatedTimers[0].current += 1
        }
        updateTimers(updatedTimers)
      }
    }, 1000)

    return () => {
      clearInterval(countDown)
    }
  }, [timers, isRunning, updateTimers, pause])

  // Reset all timers and return timers
  function resetTimers(timers) {
    timers = timers.map((timer) => {
      timer.current = 0
      timer.running = false
      return timer
    })
    return timers
  }

  // Adds another timer
  function addNewTimer() {
    let newId = parseInt(Math.random() * 10 ** 6)
    let newTimer = {
      running: false,
      duration: 5,
      current: 0,
      id: newId,
    }
    let updatedTimers = [...timers]
    updatedTimers.push(newTimer)
    updateTimers(updatedTimers)
  }

  if (isRunning) {
    return (
      <div className="max-w-md">
        <div>
          {pause ? (
            <button
              onClick={() => {
                updatePause(false)
              }}
              className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
            >
              <FaPlay />
            </button>
          ) : (
            <button
              onClick={() => updatePause(true)}
              className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
            >
              <FaPause />
            </button>
          )}
        </div>
        <div>
          {timers.map((timer) => (
            <Timer
              key={timer.id}
              duration={timer.duration}
              current={timer.current}
              id={timer.id}
              isRunning={isRunning}
            ></Timer>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="max-w-md">
        <div>
          <button
            onClick={() => updateIsRunning(true)}
            className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
          >
            Start
          </button>
          <button onClick={() => updatePause(true)}>Pause</button>
          <button>Reset</button>
        </div>
        <div>
          {timers.map((timer) => (
            <Timer
              key={timer.id}
              duration={timer.duration}
              current={timer.current}
              id={timer.id}
              isRunning={isRunning}
            ></Timer>
          ))}
        </div>
        <div>
          <button
            onClick={addNewTimer}
            className="bg-red-950 text-white p-2 border-black border-2 rounded-full"
          >
            +
          </button>
        </div>
      </div>
    )
  }
}

export default Track
